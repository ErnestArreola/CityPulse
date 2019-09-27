import googlemaps
import pprint
import datetime
import json
import os
import csv
from fuzzywuzzy import fuzz



#Put your own google places API key
API_KEY = ""

RETURN_FIELDS = ['name', 'place_id', 'formatted_address', 'geometry', 'price_level', 'rating']
DTLB_COORD = '33.7705300,-118.1912538'
LOCATION_PARAM = 'circle:4000@33.7705300,-118.1912538'
FUZZYWUZZY_RATIO = 90
BASIC_RETURN_FIELDS = ['place_id', 'formatted_address']
DETAIL_RETURN_FIELDS = ['name', 'geometry', 'price_level', 'rating', 'url', 'website', 'formatted_phone_number']



date = datetime.datetime.now().date()
gmaps = googlemaps.Client(key = API_KEY)




def fetchPlaces(filePath):
    """Fetch google places basic info of businesses in yelp csv file and write to a new csv file
    Args:
        filePath (str): The path of the yelp businesses csv file
    """
    csvList = []
    with open(filePath, 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Skip the header row.
        for row in reader:
            yelpBusName = row[2]
            yelpAddr = row[7] + ' ' + row[8] + ' ' + row[9] + ' ' + row[11] + ' ' + row[10]
           
            place = gmaps.find_place(input=yelpBusName, input_type='textquery', fields=RETURN_FIELDS, location_bias=LOCATION_PARAM)
        
            if len(place['candidates']) == 0: #if business not found
                #go to next business
                continue
            
            firstCand = place['candidates'][0]
            googleAddr = firstCand['formatted_address']
            
            if fuzz.WRatio(yelpAddr, googleAddr) > FUZZYWUZZY_RATIO:
                arr = []
                try:
                    arr.append(row[0])
                except:
                    arr.append('')
                try:
                    arr.append(date)
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['name'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['place_id'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['formatted_address'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['geometry']['location']['lat'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['geometry']['location']['lng'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['price_level'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['rating'])
                except:
                    arr.append('')
                csvList.append(arr)
                

    with open('/'.join((os.path.dirname(os.path.abspath(__file__))+'').split('/')[0:-6]) + '/Data/social_media/yelpToGoogle.csv', 'w') as writeFile:
        writer = csv.writer(writeFile)
        header = [
            'licenseNum', 'date_fetched', 'name', 'place_id', 'formatted_address', 'latitude', 'longitude', 'price_level', 'rating' 
        ]
        writer.writerow(header)
        for row in csvList:
            writer.writerow(row)
    
    print('Done')





def fetchPlacesDetail(filePath):

    """Fetch google places detail info of businesses in yelp csv file and write to a new csv file
    Args:
        filePath (str): The path of the yelp businesses csv file
    """

    csvList = []
    with open(filePath, 'r') as f:
        reader = csv.reader(f)
        next(reader)  # Skip the header row.
        
        for row in reader:
            
            yelpBusName = row[2]
            yelpAddr = row[7] + ' ' + row[8] + ' ' + row[9] + ' ' + row[11] + ' ' + row[10]
           
            place = gmaps.find_place(input=yelpBusName, input_type='textquery', fields=BASIC_RETURN_FIELDS, location_bias=LOCATION_PARAM)
        
            if len(place['candidates']) == 0: #if business not found
                #go to next business
                continue
            
            #grab first candidate in return results
            firstCand = place['candidates'][0]
            googleAddr = firstCand['formatted_address']
            
            #check if address from Yelp and Google match
            if fuzz.WRatio(yelpAddr, googleAddr) > FUZZYWUZZY_RATIO:

                place_details = gmaps.place(place_id = firstCand['place_id'], fields=DETAIL_RETURN_FIELDS)

                #skip to next iteration if business detail is not found
                if(place_details['status'] != 'OK'):
                    continue

                arr = []
                try:
                    arr.append(row[0])
                except:
                    arr.append('')
                try:
                    arr.append(date)
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['name'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['place_id'])
                except:
                    arr.append('')
                try:
                    arr.append(firstCand['formatted_address'])
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['geometry']['location']['lat'])
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['geometry']['location']['lng'])
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['price_level'])
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['rating'])
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['url'])
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['website'])
                except:
                    arr.append('')
                try:
                    arr.append(place_details['result']['formatted_phone_number'])
                except:
                    arr.append('')

                csvList.append(arr)
                



    with open('/'.join((os.path.dirname(os.path.abspath(__file__))+'').split('/')[0:-6]) + '/Data/social_media/yelpToGoogle2.csv', 'w') as writeFile:
        writer = csv.writer(writeFile)
        header = [
            'licenseNum', 'date_fetched', 'name', 'place_id', 'formatted_address', 'latitude', 'longitude', 'price_level', 'rating', 'url', 'website', 'formatted_phone_number',
        ]
        writer.writerow(header)
        for row in csvList:
            writer.writerow(row)
    
    print('Done')



if __name__ == '__main__':

    fetchPlacesDetail('/'.join((os.path.dirname(os.path.abspath(__file__))+'').split('/')[0:-6]) + '/Data/social_media/yelp2.csv')
