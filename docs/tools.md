[⬅️ Back to Overview](../README.md)  

# 🧰 Tools

The **`/tools`** directory contains supplementary scripts and utilities  
that are **not part of the core** of ClusterSim or BotController,  
but provide important additional functionality.

---

## 🎞️ `blender_python_import_for_replay.py`

This Python script enables the **import of motion logs into Blender**  
and generates an animated visualization of the morphing process.  
Tested with **Blender version 4.4.3**.

---

## 🎯 `blender_python_targetdesign.py`

This tool allows you to **interactively design your own structures**  
and export them as a JSON file.

- The result is a file like `base_[xyz].json`
- This file can be placed under **`/structures`** in the BotController directory
- It will then appear **automatically in the WebGUI** as a selectable structure

This makes it easy to design morph targets directly in Blender  
and use them later within the controller.

---

📌 More tools are planned, such as:
- Timeline analysis  
- OP-Code optimization  
- Visualization of complex moves

---

## 📁 Directory structure – `tools`

```
.
├── base_30.json
├── base_30.xml
├── blender_python_import_for_replay.py
├── blender_python_targetdesign.py
└── generate.js
```

---

# ⚙️ `generate.js`

ClusterSim requires a valid **start configuration** of CellBots.  
This configuration is stored in the file **`cells.xml`** and referenced in **`config.txt`** as the active structure.

Typically, these are small stack-like configurations – e.g.,  
**25**, **40**, or **72 CellBots**, depending on the test scenario.

---

## 🧱 Creating a custom configuration

If you want to define how many CellBots should be placed in  
**width**, **height**, and **depth**,  
you can use the tool **`/tools/generate.js`**.

This script will automatically generate a corresponding **`cells.xml`**  
based on your chosen dimensions.

This makes it easy to create individual start setups in seconds – ideal for:

- Testing unusual geometries  
- Performance experiments with large clusters  
- Developing new morph algorithms with flexible starting layouts

```js
// ==== PARAMETERS ====
const width  = 5;   // x-direction
const depth  = 3;   // z-direction
const height = 2;   // y-direction (number of layers)
```

---

### Example of a generated `cells.xml`

```xml
<xml>

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

<cell>
  <id>B01</id>
  <pos>
    <x>1</x>
    <y>0</y>
    <z>0</z>
    <vx>1</vx>
    <vy>0</vy>
    <vz>0</vz>
    <col>fffffff</col>
  </pos>
</cell>

</xml>
```

---

[⬅️ Back to Overview](../README.md)  
**Previous chapter:** [Blender replay and animation](blender.md) |   
**Next chapter:** [Vision & future applications](vision.md)
