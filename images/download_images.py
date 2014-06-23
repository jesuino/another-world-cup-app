import urllib2


codes = open('countries_codes.txt', 'r')
for line in codes:
	code = line.replace('\n', '').lower() + '.png'
	img_url = 'http://img.fifa.com/images/flags/4/' + code
	print img_url
	req = urllib2.Request(img_url)
	response = urllib2.urlopen(req)
	img = response.read()
	f = open(code, 'w')
	f.write(img)

