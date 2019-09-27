#Gets matching businesses in active.csv and stores info in yelp.csv

from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib

from urllib.parse import quote

import psycopg2
import csv
import datetime

#put in your own yelp api key
API_KEY = ''

API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
MATCH_PATH = '/v3/businesses/matches'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.

SEARCH_LIMIT = 3


def request(host, path, api_key, url_params=None):
    """Given your API_KEY, send a GET request to the API.
    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        API_KEY (str): Your API Key.
        url_params (dict): An optional set of query parameters in the request.
    Returns:
        dict: The JSON response from the request.
    Raises:
        HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = '{0}{1}'.format(host, quote(path.encode('utf8')))
    headers = {
        'Authorization': 'Bearer %s' % api_key,
    }

    # print(u'Querying {0} ...'.format(url))

    response = requests.request('GET', url, headers=headers, params=url_params)

    return response.json()


def search(api_key, term, location):
    """Query the Search API by a search term and location.
    Args:
        term (str): The search term passed to the API.
        location (str): The search location passed to the API.
    Returns:
        dict: The JSON response from the request.
    """

    url_params = {
        'name': term.replace(' ', '+'),
        'address1': location.replace(' ', '+'),
        'city': 'Long Beach',
        'state': 'US',
        'country': 'US',
        'limit': SEARCH_LIMIT
    }
    return request(API_HOST, MATCH_PATH, api_key, url_params=url_params)


def get_business(api_key, business_id):
    """Query the Business API by a business ID.
    Args:
        business_id (str): The ID of the business to query.
    Returns:
        dict: The JSON response from the request.
    """
    business_path = BUSINESS_PATH + business_id

    return request(API_HOST, business_path, api_key)


def query_api(term, location):
    """Queries the API by the input values from the user.
    Args:
        term (str): The search term to query.
        location (str): The location of the business to query.
    """
    response = search(API_KEY, term, location)

    businesses = response.get('businesses')

    if not businesses:
        print(u'No businesses for {0} in {1} found.'.format(term, location))
        return

    business_id = businesses[0]['id']

    # print(u'{0} businesses found, querying business info ' \
    #     'for the top result "{1}" ...'.format(
    #         len(businesses), business_id))
    response = get_business(API_KEY, business_id)

    # print(u'Result for business "{0}" found:'.format(business_id))
    pprint.pprint(response, indent=2)


if __name__ == '__main__':
    conn = psycopg2.connect(
        "host=127.0.0.1 dbname=businessdb user=postgres password=admin")
    cur = conn.cursor()

    postgreSQL_select_Query = "select * from business_business"
    cur.execute(postgreSQL_select_Query)
    # print("Selecting rows from mobile table using cursor.fetchall")
    businesses = cur.fetchall()
    d = datetime.datetime.now()
    date = d.date()

    with open('/Users/David/Desktop/yelp.csv', 'w') as appendFile:
        writer = csv.writer(appendFile)
        header = [
            'licenseNum', 'date', 'yelp_name', 'yelp_id', 'image_url',
            'is_claimed', 'is_closed', 'address', 'city', 'state', 'country',
            'zip_code', 'price', 'rating', 'review_count', 'transactions',
            'url'
        ]
        writer.writerow(header)

        count = 0
        total = 0
        for row in businesses:
            total = total + 1
            if total >= 4900:
                break
            print(total)
            #4435
            business = search(API_KEY, row[2], row[-2])
            try:
                if len(business['businesses']) != 0:
                    count = count + 1
                    print("count")
                    print(count)
                    info = get_business(API_KEY,
                                        business['businesses'][0]['id'])
                    # pprint.pprint(info)
                    arr = []
                    try:
                        arr.append(row[0])
                    except:
                        arr.append('')
                    try:
                        arr.append(str(date))
                    except:
                        arr.append('')
                    try:
                        arr.append(info['name'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['id'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['image_url'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['is_claimed'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['is_closed'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['location']['address1'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['location']['city'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['location']['state'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['location']['country'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['location']['zip_code'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['price'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['rating'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['review_count'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['transactions'])
                    except:
                        arr.append('')
                    try:
                        arr.append(info['url'])
                    except:
                        arr.append('')

                    writer.writerow(arr)
            except:
                print(business)
    print(total)
    appendFile.close()
