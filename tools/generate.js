const fs = require('fs');

// ==== PARAMETERS ====
const width  = 5;   // x-direction
const depth  = 3;   // z-direction
const height = 2;   // y-direction (number of layers)

function pad(n) {
    return n < 10 ? '0' + n : '' + n;
}

function cellXML(id, x, y, z, vx, vy, vz, col) {
    return `
<cell>
<id>${id}</id>
<pos>
<x>${x}</x>
<y>${y}</y>
<z>${z}</z>
<vx>${vx}</vx>
<vy>${vy}</vy>
<vz>${vz}</vz>
<col>${col}</col>
</pos>
</cell>
`.trim();
}

// ==== XML HEADER ====
let xml = `<xml>

<masterbot>
<id>MASTERBOT</id>
<pos>
<x>0</x>
<y>0</y>
<z>0</z>
<vx>1</vx>
<vy>0</vy>
<vz>0</vz>
</pos>
<mbconnection>f</mbconnection>
</masterbot>
`;

// ==== JSON CLUSTER ====
let cluster = [];

let botNr = 1;
const cols = ['4444ff', '0000ff', 'ff4444', '44ff44', 'cccccc', '222222', '66ddff', 'ffcc00'];

// Generate bots
for (let layer = 0; layer < height; layer++) {
    let y = -layer;
    for (let ix = 0; ix < width; ix++) {
        for (let iz = 0; iz < depth; iz++) {
            let id = 'B' + pad(botNr);
            let x = 1 + ix;
            let z = 0 + iz;
            let vx = 1, vy = 0, vz = 0;
            if (ix % 2 === 0) {
                vx = 1; vz = 0;
            } else {
                vx = 0; vz = 1;
            }
            let col = cols[(ix + iz + layer) % cols.length];
            xml += '\n\n' + cellXML(id, x, y, z, vx, vy, vz, col);

            // Also push to JSON cluster array
            cluster.push({ x: x, y: y, z: z });

            botNr++;
        }
    }
}

xml += `

</xml>
`;

const totalBots = width * depth * height;
const basename = `base_${totalBots}`;

// ==== FILE OUTPUT ====
// XML
fs.writeFileSync(`${basename}.xml`, xml.trim());
// JSON (formatted, 2-space indent)
fs.writeFileSync(`${basename}.json`, JSON.stringify(cluster, null, 2));

console.log(`${basename}.xml and ${basename}.json generated with ${totalBots} cells plus MasterBot.`);
