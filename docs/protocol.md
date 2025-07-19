[⬅️ Back to Overview](../README.md)

# Cellbot Protocol and OP-Codes

This document provides an overview and specification of the most important CellBot commands. These commands cover areas such as scanning, messaging, localization, movement, and basic sensor data (e.g., neighbor detection).

Additional commands (e.g., "PING") also exist but are currently undocumented. While implemented, they are not relevant to the morphing or structure scan processes at the moment. These might become useful in future hardware features.

**Note:**
The list of OP-Codes is extensible. Custom commands always start with "X" and can be added as needed. Currently, such commands are used for color input (XSC) and color reading (XRC, XRRC), especially for debugging purposes. By default, all "X" commands are forwarded by any CellBot, regardless of whether they understand the command.

<center>
  <img src="img/sketch1.png" width="180"/>
  <sub>Basic degrees of freedom</sub>
</center>

Illustration: Each CellBot has six available slots—one for each spatial direction. These slots are used to connect and communicate with other bots in the cluster (T=Top, D=Down, L=Left, R=Right, F=Front, B=Back).

# CellBot Commands – Table of Contents

1. [INFO](#1-command-info)
2. [RINFO](#2-command-rinfo)
3. [CHECK](#3-command-check)
4. [RCHECK](#4-command-rcheck)
5. [MOVE](#5-command-move)
6. [RALIFE](#6-command-ralife)
7. [X-Custom Command](#7-command-x-custom-command)
8. [Logging](#logging)

## 1. Command: INFO

**Purpose:**
General information request to a CellBot (without neighbor info). The MasterBot does not yet know the ID of the bot and assigns a temporary number.

**Message format:**
`[(address)#INFO#[TMPID]#(return-address)]`

**Example:**
`[F#INFO#001#S]`

- **F**: Address slot of the recipient (e.g., approached from behind)
- **INFO**: Command
- **001**: Temporary ID
- **S**: Return address to "Self" (the querying MasterBot)

`[FF#INFO#002#SR]`
`[FFR#INFO#002#SBB]`

---

## 2. Command: RINFO

**Purpose:**
Response to an INFO command with the key bot data.

**Message format:**
`[(address)#RINFO#(ID);(TMPID);(Type);(Incoming-Slot);(Vector)]`

**Example:**
`[B#RINFO#B01;001;0;B;-1,0,0]`

- `B`: Address (slot from which the reply is returned)
- `RINFO`: Response command
- `B01`: Real bot ID
- `001`: Temporary ID (as sent by the MasterBot)
- `0`: Type (e.g., 0 = standard CellBot)
- `B`: Incoming slot of the original command
- `-1,0,0`: Relative vector to the next (addressed) neighbor bot

---

## 3. Command: CHECK

**Purpose:**
Checks if a CellBot is present at a given slot (e.g., neighbor position) and whether it responds.

**Message format:**
`[(address)#CHECK#(Slot[Target])#(Return-Address)]`

**Example:**
`[F#CHECK#R#B]`

---

## 4. Command: RCHECK

**Purpose:**
Response to a CHECK command with status information about the slot.

**Message format:**
`[(address)#RCHECK#(ID);(Status)]`

**Example:**
`[B#RCHECK#B01;OK]`

**Status Codes:**

- **OK**: CellBot is functional (responds)
- **OFFL**: CellBot detected but offline
- **EMPT**: No CellBot at this position

---

## 5. Command: MOVE

**Purpose:**
Universal movement command—enables combined motor movements of a CellBot, including climbing, rotation, grabbing, and permanent connections.

**Special Notes:**
- Multiple subcommands can be separated by commas `,`
- If no return address (ALIVE) is required, the trailing `#` can be omitted
- Subcommands can include repetition counts (`...10`)
- Movement logic is based on specifying "grip points"—the MasterBot tells the CellBot where to hold on before, during, and after the move ("monkey swings from vine")

---

### Message format:

```
[(address)#MOVE#(one or more subcommands...)#(Return-Address)]
```

#### Subcommand format:

```
[Start-Anchor]_[Direction/Command]_[End-Anchor][Repetition]
```

---

### Allowed Directions & Commands
- **Orthogonal:** F (Front), R (Right), B (Back), L (Left), T (Top), D (Down)
- **Spin:** SL (Spin Left 90°), SR (Spin Right 90°)
- **Connect (Permanent):** C + slots (e.g., CLR = Connect Left and Right)
- **Grab/Transport:** GF (Grab Front), G (Release)
- **Lifesign:** LIFE (Proof-of-life at end of sequence)

---

### Movement Examples
- `D_F_D`: Move forward, grip Down before and after
- `L_F_L`: Side-hang (grip Left)
- `T_F_L`: Swing under a chain
- `D_F_D42`: Repeat 42 times
- `FFT#MOVE#D_TF_D`: Climb with top then front motion
- `FFT#MOVE#B_B_B10`: Climb up a back wall 10x
- `D_SR_D`: 90° spin right
- `[(address)#MOVE#D_F_D,LIFE#(Return-Address)]`: With proof-of-life at the end
- `[(address)#MOVE#D_F_D;CLR]`: Permanent connect on Left & Right
- `[(address)#MOVE#GF(slot)]`: Grab CellBot in front

---

## 6. Command: RALIFE

**Purpose:**
Proof-of-life response after completing a movement sequence (e.g., triggered by "LIFE" subcommand).

**Message format:**
`[(address)#RALIFE#(Bot-ID)]`

**Example:**
`BBL#RALIFE#B001`

---

## 7. Command: X-Custom Command

**Purpose:**
Allows developer-defined special commands. All custom commands start with **"X"**. Unknown X-commands are forwarded by default unless blocked by hardware.

---

### Message format:

```
[(address)#X[CUSTOM-COMMAND]#(PARAMETERS)#(Return-Address)]
```

---

### Examples:

**Set Color (Red):**
```text
[F#XSC#ff0000]
```

**Read Color:**
```text
[F#XRC#B]
```

**Color Response:**
```text
[F#XRRC#B]
```

---

## Logging

Both **ClusterSim** and the **BotController** have a logging function (`logger.js`). This can supplement or replace `console.log()` and is particularly useful for analyzing bot communication.

### In-Code Usage
```js
Logger.log("Start cluster_sim");
Logger.reset();
```

Logs are stored in `/logs/log.txt`, cleared automatically on startup.

---

## Architecture: Hardware-Agnostic by Design

A core principle of this project is that the **BotController never depends on simulation details**:

- It communicates with the MasterBot (real or simulated) via a clean protocol.
- All visualization (colors, animation) is handled by ClusterSim.
- BotController only sees start/end positions, optionally explicit data via commands like `XSC`.

**Advantage:** Real hardware can replace the simulation without touching the controller code.

> The BotController does not care whether it talks to a virtual or physical MasterBot. This ensures modularity and future-proof design.

[⬅️ Back to Overview](../README.md)
**Previous:** [Installation & Quickstart](install.md) | **Next:** [CellBot Hardware Blueprint (Virtual)](hardware_blueprint.md)

