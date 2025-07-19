import bpy
import json
import os

# Mesh objects with prefix "Cube"
cube_objects = [obj for obj in bpy.context.scene.objects 
                if obj.type == 'MESH' and obj.name.startswith('Cube')]

cluster = []
for obj in cube_objects:
    loc = obj.matrix_world.translation
    coord = {
        "x": int(round(loc.x)),           # X stays X
        "y": int(round(loc.z)),           # Y (up) comes from Blender Z
        "z": int(round(loc.y)),           # Z (depth) comes from Blender Y
    }
    cluster.append(coord)

output = json.dumps(cluster, indent=2)

# Save location: In the same folder as the .blend file, otherwise in the home directory
if bpy.data.is_saved:
    blend_dir = os.path.dirname(bpy.data.filepath)
else:
    blend_dir = os.path.expanduser("~")

outpath = os.path.join(blend_dir, "arch.json")

with open(outpath, "w") as f:
    f.write(output)

print(f"Cluster export successful! File saved as:\n{outpath}")
