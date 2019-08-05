# input-modal

Input modal for choices with bootsrap and vuejs

Has a PHP back-end. Does not use any PHP framework

### Directory
```
-/
 |-.git/
 | `-(auto generated files from git)
 |
 |-api/
 | |-includes/
 | | |-model/
 | | | |-logo.php
 | | | |-logoCategory.php
 | | | |-logoItem.php
 | | | |-model.php
 | | | |-poster.php
 | | | `-user.php
 | | |
 | | |-plugins/
 | | |-vendor/
 | | | `-(auto generated files from composer)
 | | |
 | | |-view/
 | | | |-adminView.php
 | | | |-categoryView.php
 | | | |-itemView.php
 | | | |-logoView.php
 | | | |-posterView.php
 | | | `-view.php
 | | |
 | | |-.env
 | | |-.env.example
 | | |-.gitignore
 | | |-.htaccess
 | | |-composer.json
 | | |-composer.lock
 | | |-connection.php
 | | `-reply.php
 | |
 | |-admin.php
 | |-categories.php
 | |-items.php
 | |-logos.php
 | `-poster.php
 |
 |-css/
 |  `-inputModal.css
 |
 |-db/
 |  |-db_data.sql
 |  `-db.sql
 |
 |-img/
 |-js/
 |  `-inputModal.js
 |
 |-index.html
 `-README.md
 
```

### Database

The database should be MySQL(5.7) database.
Import the files in /db/ file.

### Server
**For development**
- php dev server may be used
```
php -S host:port
```

**For production**
- Use Apache server


#### Config
**For Backend Config**
Edit the /api/includes/.env file 

**For Js Config**
Edit the js file /api/inputModal.js and change the host var
```javascript
  
  /**
   * Back-end Server Host URL
   * dynamic_url: host changes with window url
   * for production, dynamic_url = false
   */
  let host = {
    url: 'http://127.0.0.1',
    dynamic_url: true
  }
  
```

