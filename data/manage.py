from os import listdir
from os.path import isfile, join

def get_files(data_folder_path):
    governance_dir_names = listdir(data_folder_path)
    for governance_dir_name in governance_dir_names:
        municipality_file_names = listdir('%s/%s'%(data_folder_path,governance_dir_name))
        for municipality_file_name in municipality_file_names:
            yield '%s/%s'%(governance_dir_name, municipality_file_name)
