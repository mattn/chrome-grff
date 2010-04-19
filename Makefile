DEST = "$(shell pwd)/chrome-grff"

ifndef CHROME
ifneq ($(windir),)

# Windows
CHROME = "$(USERPROFILE)/Local Settings/Application Data/Google/Chrome/Application/chrome.exe"

else

# Other Platform: Linux? Mac?
DEST = $(shell pwd)/chrome-grff

CHROME = $(shell which crxmake)
ifeq ($(CHROME),)
CHROME = $(shell which google-chrome)
endif
ifeq ($(CHROME),)
CHROME = $(shell which chromium-browser)
endif
ifeq ($(CHROME),)
CHROME = chrome
endif
endif
endif

SRCS = btn.gif background.html fullfeed.js fullfeed.css manifest.json

all : chrome-grff.crx

first : $(SRCS)
	@-rm -rf $(DEST)
	@mkdir $(DEST)
	@cp $(SRCS) $(DEST)
	$(CHROME) --pack-extension=$(DEST)

chrome-grff.crx : $(SRCS)
	@-rm -rf $(DEST)
	@mkdir $(DEST)
	@cp $(SRCS) $(DEST)
	$(CHROME) --pack-extension=$(DEST) --pack-extension-key=$(DEST).pem

zip: $(SRCS)
	@-rm -rf chrome-grff.zip
	@-rm -rf $(DEST)
	@mkdir $(DEST)
	@cp $(SRCS) $(DEST)
	zip -r chrome-grff.zip chrome-grff

clean:
	-@rm *.crx
	-@rm -r $(DEST)

test:
	$(CHROME) --enable-extensions --load-extension=$(DEST)/..

