# input-modal

Input modal for choices with bootsrap and vuejs

Has a PHP back-end. Does not use any PHP framework

### Directory
```
-/
 |-api/
   |-includes/
    |-model/
      |-logo.php
      |-logoCategory.php
      |-logoItem.php
      |-model.php
    |-view/
      |-categoryView.php
      |-itemView.php
      |-logoView.php
      |-view.php
    |-connection.php
    |-reply.php
   |-vendor/
   |-categories.php
   |-composer.json
   |-composer.lock
   |-items.php
   |-logos.php
   |-.env
 |-css/
   |-inputModal.css
 |-db/
   |-db_data.sql
   |-db.sql
 |-img/
 |-js/
   |-inputModal.js
 |-index.html
 |-README.md
```

### Database

The database should be MySQL(5.7) database.
Import the files in /db/ file.

### Server
**For development**
>php dev server may be used

**For production**
>Use Apache server


#### Config
Edit the /api/.env file 