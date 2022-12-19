from collections import namedtuple
from dataclasses import dataclass
from typing import NamedTuple, Any
import random
import math
import copy
from matplotlib.patches import Circle, Rectangle, Polygon
import matplotlib.pyplot as plt
import os
import json
import numpy
import csv
from csv import DictReader
import sys
import numpy as np
from shapes import Triangle
from shapes import Cross
import shapes
import cairo


@dataclass
# class Object(NamedTuple):
class Quadrant:
    x: int = 0
    y: int = 0
    radius: int = 0
    context: Any = 'None'
    color: str = 'None'
    shape: str = 'None'
    number: int = 1
    position: str = None
    pattern: str = None

    # number: int
    # quadrant: None
    # color: None
    # pattern: None

    def get_parameters(self):
        parameters = (self.x, self.y, self.radius, self.color)
        return parameters

    def test_unused_argument(self):
        return self.radius

    def set_color(self):
        if self.color == 'orange':
            self.context.set_source_rgb(1, 0.51, 0)
        elif self.color == 'blue' or self.color == 'blau':
            self.context.set_source_rgb(0.35, 0.7, 0.9)
        elif self.color == 'grey' or self.color == 'grau':
            self.context.set_source_rgb(0.55, 0.51, 0.53)
        elif self.color == 'brown' or self.color == 'braun':
            self.context.set_source_rgb(0.53, 0.27, 0.07)
        elif self.color == 'black' or self.color == 'schwarz':
            self.context.set_source_rgb(0, 0, 0)
        elif self.color == 'green' or self.color == 'grün':
            self.context.set_source_rgb(0.67, 1, 0.18)
        elif self.color == 'purple' or self.color == 'lila':
            self.context.set_source_rgb(0.5, 0, 0.5)
        elif self.color == 'yellow' or self.color == 'gelb':
            self.context.set_source_rgb(1, 1, 0)
        elif self.color == 'turquoise' or self.color == 'türkis':
            self.context.set_source_rgb(0.25, 0.88, 0.82)
        elif self.color == 'red' or self.color == 'rot':
            self.context.set_source_rgb(1, 0, 0)
        elif self.color == 'pink':
            self.context.set_source_rgb(1, 0.07, 0.57)

    def draw_heart(self):
        x, y, radius, color = self.get_parameters()
        self.set_color()
        xoffset = 0.8 * radius
        yoffset1 = 0.6 * xoffset
        yoffset2 = 0.7 * xoffset
        y = y - yoffset1
        self.context.move_to(x, y)
        self.context.curve_to(x, y - yoffset1, x - xoffset, y - yoffset1, x - xoffset, y)
        self.context.curve_to(x - xoffset, y + yoffset1, x, y + yoffset2, x, y + 2 * yoffset1)
        self.context.curve_to(x, y + yoffset2, x + xoffset, y + yoffset1, x + xoffset, y)
        self.context.curve_to(x + xoffset, y - yoffset1, x, y - yoffset1, x, y)
        self.context.fill_preserve()
        self.context.set_source_rgba(0, 0, 0, 1)
        self.context.set_line_width(1)
        self.context.stroke()
        self.context.save()

    def draw_triangle(self):
        x, y, radius, color = self.get_parameters()
        self.set_color()
        radius = radius / math.sqrt(3) * 3
        self.context.move_to(x, y - (math.sqrt(3) / 3 * radius))
        self.context.line_to(x - radius / 2, y + (3 / math.sqrt(3) / 6 * radius))
        self.context.line_to(x + radius / 2, y + (3 / math.sqrt(3) / 6 * radius))
        self.context.line_to(x, y - (math.sqrt(3) / 3 * radius))
        self.context.fill_preserve()
        self.context.set_source_rgba(0, 0, 0, 1)
        self.context.set_line_width(1)
        self.context.stroke()
        self.context.save()

    def draw_rectangle(self):
        x, y, radius, color = self.get_parameters()
        self.set_color()
        radius = 2 * radius / math.sqrt(2)
        points = [
            (x - (radius / 2), y - (radius / 2)),
            (x - (radius / 2), y + (radius / 2)),
            (x + (radius / 2), y + (radius / 2)),
            (x + (radius / 2), y - (radius / 2)),
            (x - (radius / 2), y - (radius / 2))
        ]
        for i in range(len(points)):
            self.context.line_to(points[i][0], points[i][1])
        self.context.fill_preserve()
        self.context.set_source_rgba(0, 0, 0, 1)
        self.context.set_line_width(1)
        self.context.stroke()
        self.context.save()

    def draw_cross(self):
        x, y, radius, color = self.get_parameters()
        self.set_color()
        radius = radius
        b = radius / 3
        a = 2 * b
        self.context.move_to(x - (b / 2), y - (b / 2))
        points = [
            (x - (b / 2), y - (b / 2)),
            (x - (b / 2) - a, y - (b / 2)),
            (x - (b / 2) - a, y - (b / 2) + b),
            (x - (b / 2), y - (b / 2) + b),

            (x - (b / 2), y + (b / 2) + a),
            (x + (b / 2), y + (b / 2) + a),
            (x + (b / 2), y + (b / 2)),

            (x + (b / 2) + a, y + (b / 2)),
            (x + (b / 2) + a, y - (b / 2)),
            (x + (b / 2), y - (b / 2)),

            (x + (b / 2), y - (b / 2) - a),
            (x - (b / 2), y - (b / 2) - a),
            (x - (b / 2), y - (b / 2))
        ]
        for i in range(len(points)):
            self.context.line_to(points[i][0], points[i][1])
        self.context.fill_preserve()
        self.context.set_source_rgba(0, 0, 0, 1)
        self.context.set_line_width(1)
        self.context.stroke()
        self.context.save()

    def draw_circle(self):
        x, y, radius, color = self.get_parameters()
        self.set_color()
        self.context.arc(x, y, radius, 0, 2 * math.pi)
        self.context.fill_preserve()
        self.context.set_source_rgba(0, 0, 0, 1)
        self.context.set_line_width(1)
        self.context.stroke()


def make_image(c, quadrants):
    for _ in quadrants:
        _.context = c
        if _.shape == "Dreieck":
            _.draw_triangle()
        elif _.shape == "Herz":
            _.draw_heart()
        elif _.shape == "Quadrat" or _.shape == 'Viereck':
            _.draw_rectangle()
        elif _.shape == "Kreuz":
            _.draw_cross()
        elif _.shape == "Kreis":
            _.draw_circle()


def import_data_from_csv():
    f = open('test.csv', 'r')
    with f:
        csv_dict_reader = DictReader(f)
        for row in csv_dict_reader:
            print(row['Condition'])
        # for quadrant in map(Quadrant._make, reader):
        #    print(Quadrant)


def no_overlap(objs, x, y, radius):
    """Checks whether a new obj will have any overlap with an existing
    array of objs.

    Args:
        objs: an iterable of `Object`s
        x: x-value of center of new obj
        y: y-value of center of new obj
        r: radius of new obj

    Returns:
        True if the new dot has no overlap with any of the dots in `dots',
        False otherwise
    """
    return all([(x - obj.x) ** 2 + (y - obj.y) ** 2 >= (radius + obj.radius) ** 2
                for obj in objs])


def clip(val, min_val, max_val):
    """Clips `val` to be in the range [min_val, max_val]. """
    return max(min(val, max_val), min_val)


def get_random_radii(min_radius, max_radius, std=1):
    """Gets random radii of shapes for a shapes_dict.  Radii are sampled from
    a Gaussian distribution with mean (max_r - min_r) / 2 and standard
    deviation std, then clipped.

    Args:
        color_dict: dictionary of colors, with integer values
        min_radius: smallest radius
        max_radius: biggest radius
        std: standard deviation

    Returns:
        a dictionary, with the same keys as shapes_dict, and values a list of
        shapes_dict[shape] floating point numbers
    """
    mean = (max_radius - min_radius) / 2
    radius = clip(random.gauss(mean, std), min_radius, max_radius)
    return radius


def get_area_controlled_radii(shapes_dict, min_radius, max_radius, std=0.5,
                              total_area=None):
    """Gets area controlled radii: the sum of the areas of each shapes will be equal (either to total_area or to the total area taken by the
    largest number in shapes_dict dots of mean radius).

    Args:
        shapes_dict: as above
        min_radius: as above
        max_radius: as above
        std: as above
        total_area: a float, the total area to distribute to each color.  If
            not specified, this will be set to N*(max_radius - min_radius)/2^2,
            where N is the largest value in shapes_dict

    Returns:
        a dictionary, as above
    """
    mean = (max_radius - min_radius) / 2
    if not total_area:
        total_area = math.pi * (mean ** 2) * max(shapes_dict.values())
    radii = {shape: [] for shape in shapes_dict}
    for shape in shapes_dict:
        num_remaining = shapes_dict[shape]
        area_remaining = total_area
        while num_remaining > 1:
            mean = math.sqrt(area_remaining / (num_remaining * math.pi))
            # get radius that is not too big to use up all remaining area!
            found_r = False
            while not found_r:
                r = clip(random.gauss(mean, std), min_radius, max_radius)
                if math.pi * r ** 2 < area_remaining:
                    found_r = True
            radii[shape].append(r)
            area_remaining -= math.pi * r ** 2
            num_remaining -= 1
        radii[shape].append(math.sqrt(area_remaining / math.pi))
    return radii


def scattered_random(objs, area_control=False,
                     total_area=None,
                     num_pixels=(256, 256), padding=5,
                     min_radius=30, max_radius=40, std=5):
    """Generates ScatteredRandom images: the dots are scattered
    randomly through the image. """
    if area_control:
        radii = get_area_controlled_radii(min_radius, max_radius,
                                          std=std, total_area=total_area)
    else:
        radii = get_random_radii(min_radius, max_radius, std=std)
    # print({color: sum([math.pi*r**2 for r in radii[color]]) for color in radii})
    for _ in objs:
        radius = get_random_radii(min_radius, max_radius, std)
        x_min, y_min = padding + radius, padding + radius
        x_max, y_max = num_pixels[0] - padding - radius, num_pixels[1] - padding - radius
        new_obj_added = False
        while not new_obj_added:
            x = random.uniform(x_min, x_max)
            y = random.uniform(y_min, y_max)
            # avoid overlap with existing circles
            if no_overlap(objs, x, y, radius):
                _.x, _.y, _.radius = x, y, radius
                new_obj_added = True
    return objs


def scattered_split(shapes_dict, area_control=False,
                    num_pixels=(512, 256), padding=24,
                    min_radius=1, max_radius=5, std=0.5,
                    shape_order=None):
    """Generates ScatteredSplit images: the dots are scattered randomly through
    the image, but each color has its own region of the image, with different
    colors laid out horizontally. """
    width_per = num_pixels[0] / len(shapes_dict)
    mean = (max_radius - min_radius) / 2
    total_area = math.pi * (mean ** 2) * max(shapes_dict.values())
    shape_objs = {shape: scattered_random(
        {shape: shapes_dict[shape]}, area_control=area_control,
        total_area=total_area,
        num_pixels=(width_per, num_pixels[1]), padding=padding,
        min_radius=min_radius, max_radius=max_radius, std=std)
        for shape in shapes_dict}
    objs = []
    if not shape_order:
        shapes = list(shapes_dict.keys())
        random.shuffle(shapes)
    else:
        shapes = shape_order
    for idx in range(len(shapes)):
        objs.extend([obj._replace(x=obj.x + idx * width_per)
                     for obj in shape_objs[shapes[idx]]])
    return objs


def shift_position(position, quadrant):
    if position == 'links oben':
        quadrant.x, quadrant.y = quadrant.x, quadrant.y
    elif position == "rechts oben":
        quadrant.x = quadrant.x + 256
    elif position == "links unten":
        quadrant.y = quadrant.y + 256
    elif position == "rechts unten":
        quadrant.x = quadrant.x + 256
        quadrant.y = quadrant.y + 256
    return quadrant


# read csv file as list of lists of strings
with open('../test.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    # skip header
    next(reader, None)
    stimuli_file = list(reader)


# create dict with relevant data
def create_dict(line):
    line_string = ";".join(str(x) for x in line)
    line_cells = line_string.split(";")
    return dict(item=line_cells[0], condition=line_cells[1], marked_position=line_cells[9],
                marked=dict(shape=line_cells[8], position=line_cells[9], color=line_cells[10], numbers=line_cells[11]),
                rest_1=dict(shape=line_cells[12], color=line_cells[14], numbers=line_cells[16]),
                rest_2=dict(shape=line_cells[13], color=line_cells[15], numbers=line_cells[17]))


def adjust_size(max_size, size, coefficient):
    size = max_size * size * coefficient
    if size >= max_size:
        size = max_size
    return size


def draw_mark(context, position, line_width, quadrant_width, quadrant_height):
    x, y = line_width, line_width
    if position == 'links oben':
        x, y = x, y
    if position == "rechts oben":
        x += quadrant_width
    elif position == "links unten":
        y += quadrant_height
    elif position == "rechts unten":
        x += quadrant_width
        y += quadrant_width
    context.rectangle(x, y, quadrant_width, quadrant_height)
    context.set_source_rgb(1, 0, 0)
    context.set_line_width(line_width)
    context.set_line_join(cairo.LINE_JOIN_ROUND)
    context.stroke()


def sum_dict(a, b):
    temp = {}
    for key in a.keys() | b.keys():
        temp[key] = sum([d.get(key, 0) for d in (a, b)])
    return temp


# create list of dicts for each extracted line
trial_dicts_list = list(map(create_dict, stimuli_file))

quandrant_width = 256


def main():
    for t in trial_dicts_list:
        filename = "test" + t["item"] + '_' + t["condition"] + ".svg"
        quadrant_width = 256
        line_width = 5
        window_width = 2 * quadrant_width + line_width
        window_height = 2 * quadrant_width + line_width
        s = cairo.SVGSurface(filename, window_width, window_height)
        c = cairo.Context(s)
        c.set_source_rgb(0.9, 0.9, 0.9)
        c.rectangle(0, 0, window_width, window_height)
        c.fill()
        position_list = ["links oben", "rechts oben", "links unten", "rechts unten"]
        current_position_list = copy.copy(position_list)
        if not (t["marked"]["numbers"] == ''):
            marked = [Quadrant() for _ in range(int(t["marked"]["numbers"]))]
            marked = scattered_random(marked)
            draw_mark(c, t['marked']['position'], line_width=line_width, quadrant_width=quadrant_width,
                      quadrant_height=quadrant_width)
            for _ in marked:
                _.context = c
                _.shape = t['marked']['shape']
                _.color = t['marked']['color']
                _.position = t['marked']['position']
                shift_position(_.position, _)
            make_image(c, marked)
            current_position_list.remove(t['marked']['position'])
        rest1, rest2 = [],[]
        if not (t["rest_1"]["numbers"] == ''):
            rest1 = [Quadrant() for _ in range(int(t["rest_1"]["numbers"]))]
            for _ in rest1:
                _.shape = t['rest_1']['shape']
                _.color = t['rest_1']['color']
        if not (t["rest_2"]["numbers"] == ''):
            rest2 = [Quadrant() for _ in range(int(t["rest_2"]["numbers"]))]
            for _ in rest2:
                _.shape = t['rest_2']['shape']
                _.color = t['rest_2']['color']
        rest = [*rest1, *rest2]
        q2 = random.randint(1, 2)
        q4 = len(rest)
        q3 = random.randint(0, q4 - q2)
        Q2 = rest[0:q2]
        Q3 = rest[q2:q2+q3]
        Q4 = rest[q2+q3:len(rest)]
        Q2 = scattered_random(Q2)
        if Q3:
            Q3 = scattered_random(Q3)
        if Q4:
            Q4 = scattered_random(Q4)
        position_q2 = numpy.random.permutation(current_position_list)[0]
        current_position_list.remove(position_q2)
        for _ in Q2:
            _.context = c
            _.position = position_q2
            shift_position(_.position, _)
        make_image(c, Q2)
        position_q3 = numpy.random.permutation(current_position_list)[0]
        current_position_list.remove(position_q3)
        for _ in Q3:
            _.context = c
            _.position = position_q3
            shift_position(_.position, _)
        make_image(c, Q3)
        position_q4 = current_position_list[0]
        for _ in Q4:
            _.context = c
            _.position = position_q4
            shift_position(_.position, _)
        make_image(c, Q4)
        s.finish()


if __name__ == main():
    main()
