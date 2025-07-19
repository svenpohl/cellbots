import bpy
import math
import mathutils
import json
import os

# 0. Cleanup: Remove all bots except the template bot
def cleanup_bots(template_name="templatebot"):
    for obj in list(bpy.context.collection.objects):
        if obj.name != template_name and (obj.name.startswith("B") or obj.name == "masterbot"):
            bpy.data.objects.remove(obj, do_unlink=True)
cleanup_bots()

# 1. Read the logfile
logfile = os.path.join(bpy.path.abspath("//"), "blender.txt")
with open(logfile, encoding="utf-8") as f:
    events = json.load(f)

# 2. Get the template bot
template_name = "templatebot"
template_obj = bpy.data.objects.get(template_name)
if not template_obj:
    raise Exception(f"Object '{template_name}' not found!")

# 3. Clone and place bots initially
for event in events:
    if event.get("event") == "addbot":
        botid = event["botid"]
        pos = event["pos"]
        dir = event["dir"]
        color = event.get("color", "")
        new_bot = template_obj.copy()
        new_bot.data = template_obj.data.copy()
        new_bot.name = botid
        new_bot.location = (pos["x"], pos["z"], pos["y"]) # Mapping as discussed
        from math import atan2
        vx, vy, vz = dir["vx"], dir["vy"], dir["vz"]
        angle = atan2(vz, vx)
        new_bot.rotation_euler = (0, 0, angle)
        
        # ------ MATERIAL & COLOR LOGIC HERE ------
        if color and color != "": # Color set?
            # Copy material (important: each bot gets its own instance!)
            mat = template_obj.active_material.copy()
            mat.name = f"mat_{botid}"
            # Hex to RGB (0-1)
            r = int(color[0:2], 16) / 255.0
            g = int(color[2:4], 16) / 255.0
            b = int(color[4:6], 16) / 255.0
            if mat.use_nodes:
                # Find Principled BSDF and set Base Color
                bsdf = mat.node_tree.nodes.get("Glossy BSDF")
                if bsdf:
                    bsdf.inputs["Color"].default_value = (r, g, b, 1)
            else:
                mat.diffuse_color = (r, g, b, 1)
            new_bot.data.materials.clear()
            new_bot.data.materials.append(mat)
        
        bpy.context.collection.objects.link(new_bot)
        
        # bpy.context.collection.objects.link(new_bot)

# 4. Helper dict for all bots
all_bots = {obj.name: obj for obj in bpy.context.collection.objects if obj.name.startswith("B") or obj.name == "masterbot"}
frame_base = 1

# 5. Set animations (move, spin, spin2)
for event in events:
    if event.get("notify") == "update":
        for msg in event["msg"]:
            if msg["event"] == "move":
                botid = msg["botid"]
                from_pos = msg["from"]
                to_pos = msg["to"]
                ts = msg["ts"]
                duration = msg.get("duration", 400)
                frame_start = int(ts / 1000 * 24) + frame_base
                frame_end = int((ts + duration) / 1000 * 24) + frame_base
                obj = all_bots.get(botid)
                if not obj: continue
                loc_from = (from_pos["x"], from_pos["z"], from_pos["y"])
                loc_to = (to_pos["x"], to_pos["z"], to_pos["y"])
                obj.location = loc_from
                obj.keyframe_insert(data_path="location", frame=frame_start)
                obj.location = loc_to
                obj.keyframe_insert(data_path="location", frame=frame_end)

            if msg["event"] == "spin":                
                botid = msg["botid"]
                from_dir = msg["from"]
                to_dir = msg["to"]
                ts = msg["ts"]
                duration = msg.get("duration", 400)
                frame_start = int(ts / 1000 * 24) + frame_base
                frame_end = int((ts + duration) / 1000 * 24) + frame_base
                obj = all_bots.get(botid)
                if not obj: continue
                angle_from = math.atan2(from_dir["vz"], from_dir["vx"])
                angle_to = math.atan2(to_dir["vz"], to_dir["vx"])
                obj.rotation_euler = (0, 0, angle_from)
                obj.keyframe_insert(data_path="rotation_euler", frame=frame_start)
                obj.rotation_euler = (0, 0, angle_to)
                obj.keyframe_insert(data_path="rotation_euler", frame=frame_end)

            if msg["event"] == "spin2":
                botid = msg["botid"]
                from_dir = msg["from"]
                to_dir = msg["to"]
                center = msg["center"]
                ts = msg["ts"]
                duration = msg.get("duration", 400)
                frame_start = int(ts / 1000 * 24) + frame_base
                frame_end = int((ts + duration) / 1000 * 24) + frame_base
                obj = all_bots.get(botid)
                if not obj: continue

                from_vec = mathutils.Vector((from_dir["x"], from_dir["z"], from_dir["y"]))
                to_vec = mathutils.Vector((to_dir["x"], to_dir["z"], to_dir["y"]))
                center_vec = mathutils.Vector((center["x"], center["z"], center["y"]))

                # Relative vectors
                rel_from = from_vec - center_vec
                rel_to = to_vec - center_vec

                # Start and end angles
                angle_from = math.atan2(from_dir["vz"], from_dir["vx"])
                angle_to = math.atan2(to_dir["vz"], to_dir["vx"])

                steps = 8  # e.g. 8 intermediate frames
                for i in range(steps + 1):
                    t = i / steps
                    angle = angle_from * (1 - t) + angle_to * t
                    # Spherical interpolation: rotation matrix for the current angle
                    # Here: rotate around Z between start and end, rel_from length stays
                    total_angle = (angle_to - angle_from)
                    current_angle = angle_from + t * total_angle
                    rotmat = mathutils.Matrix.Rotation(current_angle - angle_from, 4, 'Z')
                    rel_current = rotmat @ rel_from
                    pos = center_vec + rel_current
                    # Rotation: linear interpolation between start and end
                    rot = angle_from * (1 - t) + angle_to * t

                    # Keyframe
                    frame = int(frame_start * (1 - t) + frame_end * t)
                    obj.location = pos
                    obj.rotation_euler = (0, 0, rot)
                    obj.keyframe_insert(data_path="location", frame=frame)
                    obj.keyframe_insert(data_path="rotation_euler", frame=frame)
