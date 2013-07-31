P-SpaceCalendar
===============

Implementation of Google Calendar events and invites on P-Space using Uberdust features.

Installation
============

1) Copy 'calendar' folder to 'sites/all/modules'.

2) Download Google API PHP Client (found here: https://code.google.com/p/google-api-php-client/).

3) Uncompress Google API PHP Client under 'sites/all/libraries/'.

4) Enable 'CalendarVis' module from Drupal's modules menu. Make sure PHP Filter is enabled.

5) Visit the module's configuration page and set the Google Calendar's parameters.

6) Go to the page you want the calendar menus to appear, and call 'calendarEventHandler()' function.
