import pandas as pd

# List of desired cities
desired_cities = ["São Paulo", "Rio de Janeiro", "Brasília", "Recife", "Belo Horizonte"]

# Input CSV file name
csv_file = "covid-processed-monthly.csv"

# Load the CSV file into a DataFrame
df = pd.read_csv(csv_file)

# Filter the data for the desired cities
city_data = df[df['city'].isin(desired_cities)][['city', 'month', 'last_available_deaths']]

# Write the filtered data to a new CSV file
city_data.to_csv('data.csv', index=False)

print("Filtered data saved to data.csv")
