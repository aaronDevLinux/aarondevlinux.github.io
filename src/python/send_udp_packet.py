#!/usr/bin/env python

import socket

#
# cmd -> 'py SendUDPPacket.py'
#
# Linux command -> 'python SendUDPPacket.py'

packetRSC_Logout_Crypted = [0x1C, 0xE4, 0x25, 0x14 , 0x6C , 0x04 , 0x0D , 0xB6 ]

TCP_IP = '192.168.100.49'
TCP_PORT = 10000
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
#1. Send
print ("1. sending packet:", packetRSC_Logout_Crypted)
s.send( bytearray( packetRSC_Logout_Crypted) )
answ = s.recv(BUFFER_SIZE)
#print ("1. received:", data)

responseInHex = ''
for i in answ: responseInHex += "%02x " % i
print ("Received(hex): ", responseInHex)
        
#2. Send
#s.send( bytearray( packetTcpTest) )
#data = s.recv(BUFFER_SIZE)
#print ("2. received:", data)
s.close()
