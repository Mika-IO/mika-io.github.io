import requests
import gzip
import shutil
import os

url = "https://data.brasil.io/dataset/covid19/caso_full.csv.gz"
output_file = "covid_data.csv"
gz_file = "caso_full.csv.gz"

# download .gz
response = requests.get(url, stream=True)
with open(gz_file, "wb") as file:
    file.write(response.content)

# unpack .gz file
with gzip.open(gz_file, "rb") as gz:
    with open(output_file, "wb") as csv:
        shutil.copyfileobj(gz, csv)

# remove .gz 
os.remove(gz_file)

print("File downloaded, extracted, and .gz file removed successfully!")
