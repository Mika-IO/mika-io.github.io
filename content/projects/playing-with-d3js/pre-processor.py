import pandas as pd
import time
import argparse

def processor():
    start_time = time.time()

    data = pd.read_csv('covid_data.csv')

    data = data.dropna()

    relevant_fields = ['city', 'date', 'last_available_deaths']
    data = data[relevant_fields]

    data['date'] = pd.to_datetime(data['date'])

    data = data[data['last_available_deaths'] > 0]

    data = data.sort_values('date')

    data.to_csv('covid-processed.csv', index=False)

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Execution time: {execution_time} seconds")


def main():
    parser = argparse.ArgumentParser(description='COVID Data Pre-processor')
    parser.add_argument('--monthly', action='store_true', help='Process data on a monthly basis')
    parser.add_argument('--weekly', action='store_true', help='Process data on a weekly basis')
    
    args = parser.parse_args()
    
    if args.monthly:
        from processors import monthly
        monthly.processor()
    elif args.weekly:
        from processors import weekly
        weekly.processor()
    else:
        print("Please specify either --monthly or --weekly")

if __name__ == '__main__':
    main()