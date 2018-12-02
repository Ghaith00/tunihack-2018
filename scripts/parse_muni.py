# -*- coding: utf-8 -*-
from __future__ import print_function 
import pandas as pd 
import json
from os import listdir


def print_arabic_dict(dic):
    if isinstance(dic, basestring) or isinstance(dic, int) or isinstance(dic, float):
        return dic
    else:
        for i in dic:
            print(i[::-1],'___', print_arabic_dict(dic[i]), end="") 
            print()

def isNaN(num):
    return num != num

data_folder_path = '../data/Saisie 2018'
years = [ "2017", "2016", "2015", "2014", "2013", "2012", "2011"]
governance_dir_names = listdir(data_folder_path)
     


def clean(city, year):
    mizaniya = u'ميزانية {}'.format(year)
    print("{}_{}".format(city, year))
    try:
        xlsx_data = pd.read_excel(city, mizaniya, encoding= 'utf-8')
        x_mat = xlsx_data.values
        income_json_dict = {}
        current_jozee = ''
        current_senf = ''
        current_baab = ''
        current_code = ''
        income_flag = True
        for current_line in x_mat:
            first_colunm = current_line[0]
            second_colunm = current_line[1]
            third_colunm = current_line[2]
            if income_flag:    

                if isNaN(first_colunm) or (isinstance(first_colunm, int) and first_colunm < 10):
                    if isNaN(second_colunm) or isNaN(third_colunm) or not third_colunm:
                        continue
                    if income_json_dict[current_jozee].has_key(current_senf):
                        if current_baab:
                            income_json_dict[current_jozee][current_senf][current_baab].update({second_colunm:str(third_colunm)})
                        else:
                            income_json_dict[current_jozee][current_senf][current_code].update({second_colunm:str(third_colunm)})
                    continue

                if isinstance(first_colunm, float) or isinstance(first_colunm, int):
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    current_code = str(first_colunm)
                    current_baab = ''
                    if income_json_dict[current_jozee].has_key(current_senf):
                        income_json_dict[current_jozee][current_senf].update({current_code:{}})
                        income_json_dict[current_jozee][current_senf][current_code].update({second_colunm:str(third_colunm)})
                    continue

                if u'الجزء' in first_colunm:
                    current_jozee = first_colunm
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    income_json_dict[current_jozee] = {"total":str(third_colunm)}
                    continue
                    
                if u'الصنف' in first_colunm:
                    current_senf = first_colunm
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    income_json_dict[current_jozee].update({current_senf:{}})
                    income_json_dict[current_jozee][current_senf]["total"] = str(third_colunm)

                if u'الباب' in first_colunm:
                    current_baab = first_colunm 
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    if income_json_dict[current_jozee].has_key(current_senf):
                        income_json_dict[current_jozee][current_senf].update({current_baab:{"total":str(third_colunm)}})

                if u'المصاريف' in first_colunm:
                    outcome_json_dict = {}
                    current_jozee = ''
                    current_kesm = ''
                    current_fasl = ''
                    current_code = ''
                    income_flag = False
            
            else:
                if isNaN(first_colunm):
                    if isNaN(second_colunm) or isNaN(third_colunm) or not third_colunm:
                        continue
                    if outcome_json_dict[current_jozee].has_key(current_kesm):
                        outcome_json_dict[current_jozee][current_kesm][current_fasl].update({second_colunm:str(third_colunm)})
                    continue

                if isinstance(first_colunm, float) or isinstance(first_colunm, int):
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    if outcome_json_dict[current_jozee].has_key(current_kesm):
                        outcome_json_dict[current_jozee][current_kesm][current_fasl].update({second_colunm:str(third_colunm)})
                    continue

                if u'الجزء' in first_colunm:
                    current_jozee = first_colunm
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    outcome_json_dict[current_jozee] = {"total": str(third_colunm)}
                    continue
                    
                if u'القسم' in first_colunm:
                    current_kesm = first_colunm
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    outcome_json_dict[current_jozee].update({current_kesm:{}})
                    outcome_json_dict[current_jozee][current_kesm]["total"] = str(third_colunm)

                if u'الفصل' in first_colunm:
                    current_fasl = first_colunm 
                    if isNaN(third_colunm) or not third_colunm:
                        continue
                    if outcome_json_dict[current_jozee].has_key(current_kesm):
                        outcome_json_dict[current_jozee][current_kesm].update({current_fasl:{}})
                        outcome_json_dict[current_jozee][current_kesm][current_fasl]["total"] = str(third_colunm)
                if u'الباب' in first_colunm:
                    current_kesm = ''
                    continue

        # str_income_json = json.dumps(income_json_dict, ensure_ascii=False).encode('utf8')
        # str_outcome_json = json.dumps(outcome_json_dict, ensure_ascii=False).encode('utf8')
        return (income_json_dict, outcome_json_dict)
    except Exception as e :
        # print("error parsing " +  str(e) )
        # print("continuing...")
        return ({}, {})

import sys
reload(sys)
sys.setdefaultencoding('utf-8')
for governance in governance_dir_names:
    governance_dict = {"name": governance, "municipalities":[]}
    municipality_file_names = listdir('%s/%s'%(data_folder_path, governance))
    for municipality in municipality_file_names:
        municipality_dict = {"name": municipality[:-5]}
        city = '{}/{}/{}'.format(data_folder_path, governance, municipality)
        for year in years:
            income, outcome = clean(city, year)
            # print(income, outcome)
            municipality_dict[year] = {"outcome":outcome, "income": income} 
        governance_dict["municipalities"].append(municipality_dict)
    governance_json = json.dumps(governance_dict, ensure_ascii=False)
    with open("out/{}.json".format(governance), 'w') as f:
        f.write(governance_json)
