#delete some attributes in yelp business to survey type, so others can give a rating to each business
#use them rating to predict score

#Please remove names and adress and other attributes that will make people have a bias.

import csv

with open('/Users/David/Desktop/survey.csv', 'w') as writeFile:
    writer = csv.writer(writeFile)

    with open('/Users/David/Desktop/yelp.csv', 'r') as readFile:
        readCSV = csv.reader(readFile, delimiter=',')

        #header = ['yelp_id', 'price', 'rating', 'review_count']

        for row in readCSV:
            if row[12] == '':
                newRow = [row[3], ' ', row[13], row[14]]
            else:
                newRow = [row[3], row[12], row[13], row[14]]
            writer.writerow(newRow)

    readFile.close()
writeFile.close()
