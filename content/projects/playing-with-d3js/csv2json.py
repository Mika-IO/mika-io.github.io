import time
import pandas as pd

def csv_to_json(csv_path, json_path):
    data = pd.read_csv(csv_path, encoding='utf-8')
    data.to_json(json_path, orient='records', indent=4)

csv_file_path = 'covid_data.csv'
json_file_path = 'covid_data.json'

start_time = time.time()

csv_to_json(csv_file_path, json_file_path)

end_time = time.time()
execution_time = end_time - start_time

print(f"exectution time: {execution_time} seconds")