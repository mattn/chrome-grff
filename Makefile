ifndef CHROME
ifneq ($(windir),)

# Windows
DEST = "$(shell pwd)\chrome-grff"
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

SRCS = google_reader_full_feed.gif google_reader_full_feed.html google_reader_full_feed.js manifest.json

all : chrome-grff.crx

first : $(SRCS)
	@-rm -r $(DEST)
	@mkdir $(DEST)
	@cp $(SRCS) $(DEST)/.
	$(CHROME) --pack-extension=$(DEST)

chrome-grff.crx : $(SRCS)
	@-rm -r $(DEST)
	@mkdir $(DEST)
	@cp $(SRCS) $(DEST)/.
	$(CHROME) --pack-extension=$(DEST) --pack-extension-key=$(DEST).pem

clean:
	-@rm *.crx
	-@rm -r $(DEST)

test:
	$(CHROME) --enable-extensions --load-extension=$(DEST)/..

