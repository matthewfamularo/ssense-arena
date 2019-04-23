# ssense-arena
Run the program with Node. It will output an html file that can then be uploaded to are.na at https://www.are.na/import/upload.

Right now, this uses Puppeteer to log into ssense, navigate to your wishlist, and then output the list of links into a format that mirrors Safari's bookmark export file structure which can then be imported into are.na. I eventually would like to use the are.na API to take the output from Puppeteer and inject the links into a channel without having to manually upload the file.
