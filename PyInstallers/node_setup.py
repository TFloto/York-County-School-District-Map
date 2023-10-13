import requests
import os

url = 'https://nodejs.org/dist/v18.14.2/node-v18.14.2-x64.msi'
r = requests.get(url)

open('node.msi', 'wb').write(r.content)


os.system('node.msi')
