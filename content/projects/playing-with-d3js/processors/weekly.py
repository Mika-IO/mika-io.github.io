import pandas as pd
import time

def processor():
    start_time = time.time()

    data = pd.read_csv('covid_data.csv')

    data = data.dropna()

    relevant_fields = ['city', 'date', 'last_available_deaths']
    data = data[relevant_fields]

    data['date'] = pd.to_datetime(data['date'])

    data = data[data['last_available_deaths'] > 0]

    data['week'] = data['date'].dt.to_period('W').apply(lambda r: r.start_time)

    data_weekly = data.groupby(['city', 'week'])['last_available_deaths'].sum().reset_index()

    data_weekly.to_csv('covid-processed-weekly.csv', index=False)

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Execution time: {execution_time} seconds")
