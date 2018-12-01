# -*- coding: utf-8 -*-
from __future__ import print_function 
import pandas as pd 


def print_arabic_dict(dic):
    if isinstance(dic, basestring) or isinstance(dic, int) or isinstance(dic, float):
        return dic
    else:
        for i in dic:
            print(i[::-1],'___', print_arabic_dict(dic[i]), end="") 
            print()

def isNaN(num):
    return num != num


xlsx_data = pd.read_excel('./data/أريانة.xlsx', u'ميزانية 2016', encoding= 'utf-8')
x_mat = xlsx_data.values
json_dict = {}
current_jozee = ''
current_senf = ''
current_baab = ''
current_code = ''

for current_line in x_mat:

    first_colunm = current_line[0]
    second_colunm = current_line[1]
    third_colunm = current_line[2]


    if isNaN(first_colunm) or (isinstance(first_colunm, int) and first_colunm < 10):
        if isNaN(second_colunm) or isNaN(third_colunm) or not third_colunm:
            continue
        if current_baab:
            json_dict[current_jozee][current_senf][current_baab].update({second_colunm:third_colunm})
        else:
            json_dict[current_jozee][current_senf][current_code].update({second_colunm:third_colunm})
        continue

    if isinstance(first_colunm, float) or isinstance(first_colunm, int):
        if isNaN(third_colunm) or not third_colunm:
            continue
        current_code = str(first_colunm)
        current_baab = ''
        json_dict[current_jozee][current_senf].update({current_code:{}})
        json_dict[current_jozee][current_senf][current_code].update({second_colunm:third_colunm})
        continue

    if u'الجزء' in first_colunm:
        current_jozee = first_colunm
        json_dict[current_jozee] = {}
        continue
        
    if u'الصنف' in first_colunm:
        current_senf = first_colunm
        json_dict[current_jozee].update({current_senf:{}})

    if u'الباب' in first_colunm:
        current_baab = first_colunm 
        json_dict[current_jozee][current_senf].update({current_baab:{}})

    if u'المصاريف' in first_colunm:
        break

print_arabic_dict(json_dict)

