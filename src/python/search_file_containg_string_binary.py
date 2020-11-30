#!/usr/bin/python3

import fnmatch
import os

files_pattern = ['AssemblyInfo.cs' ] #, '*.h', '*.cpp'] #'*.cs' #subory, ktore sa zahrnu do vyhladavania
matches = [] #vyhovujuce vysledky

#Najprv najdeme vsetky vhodne subory podla patternu
for root, dirnames, filenames in os.walk("."):
    for extensions in files_pattern:
        for filename in fnmatch.filter(filenames, extensions):
            fileFullPath = os.path.join(root, filename)
            matches.append( fileFullPath )
            #print( fileFullPath )

counter = 1
for oneFile in matches:       
    with open(oneFile, 'rb') as f:
        if b'\xEF\xBF\xBD' in f.read(): #hladane bajty
            print( str(counter) + '. Pattern found in file ' + oneFile)
            counter += 1;
        f.close()
