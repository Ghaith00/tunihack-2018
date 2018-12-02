# -*- coding: utf-8 -*-
from __future__ import print_function 
import pandas as pd 
import json 
from os import listdir

def isNaN(num):
    return num != num
def check_Nan(str):
    if isNaN(str):
        return ''
    else:
        return str
def make_project(ligne):
    return   {
                "name": check_Nan(ligne[0]),
                "description" : check_Nan(ligne[1]),
                "type" : check_Nan(ligne[2]),
                "field" : check_Nan(ligne[3]),
                "cost" : check_Nan(ligne[17]),
                "planned cost" : check_Nan(ligne[11])
             } 
def get_projects(city):
    print(city)
    try:
        xlsx_data = pd.read_excel(city, u'المشاريع', encoding= 'utf-8')
    except Exception:
        xlsx_data = pd.read_excel(city, u'المشاريع ', encoding= 'utf-8')
    x_mat = xlsx_data.values
    projects = []
    for i in x_mat[1:]:
        if isNaN(i[0]):
            break
        project = make_project(i)
        projects.append(project)
    return projects

data_folder_path = '../data/Saisie 2018'
governance_dir_names = listdir(data_folder_path)
     
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
for governance in governance_dir_names:
    governance_dict = {"name": governance, "municipalities":[]}
    municipality_file_names = listdir('%s/%s'%(data_folder_path, governance))
    for municipality in municipality_file_names:
        municipality_dict = {"name": municipality}
        city = '{}/{}/{}'.format(data_folder_path, governance, municipality)
        projects = get_projects(city)
        governance_dict["municipalities"].append(projects)
    governance_json = json.dumps(governance_dict, ensure_ascii=False)
    with open("../db/projects/{}.json".format(governance), 'w') as f:
        f.write(governance_json)

# str_json = json.dumps(projects, ensure_ascii=False).encode('utf-8')
# with open('test_macharii.json','w') as f:
#     f.write(str_json)