#!/usr/bin/python

import fnmatch
import os
import re

import colorama #pip install colorama
from colorama import Fore, Back, Style

colorama.init()

files_pattern = ['*.csproj'] #['*.jpg', '*.jpeg', '*.png', '*.tif', '*.tiff', '*.py'] #.py len pre test ucely
matches = []

CRED    = '\33[31m'
CGREEN  = '\33[32m'

for root, dirnames, filenames in os.walk("."):
    for extensions in files_pattern:
        for filename in fnmatch.filter(filenames, extensions):
            fileFullPath = os.path.join(root, filename)
            print( Fore.WHITE + fileFullPath )

            #Pohladame string 'TargetFrameworkVersion' v subore
            patternToFind = 'TargetFrameworkVersion' # casom treba aj na regexp hladat
            if patternToFind in open(fileFullPath).read():
                fiIn = open(fileFullPath).readlines()
                for line in fiIn:
                    if patternToFind in line:
                        if '<TargetFrameworkVersion>v4.0</TargetFrameworkVersion>' in line:
                            print( Fore.CYAN + line ) #line.strip()
                        else:
                            print( Fore.GREEN + line ) #line.strip()
                #matches.append(fileFullPath)
            
#Vypiseme co sme nasli
#for n in matches:
#	print("Nasiel som to ja kokot: " + n)
