<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once 'authView.php';
  require_once __DIR__ .'/../model/poster.php';
  
  use Api\Includes\View\View;
  use Api\Includes\Model\Poster;
  use Api\Includes\View\AuthView;
  
  class PosterView extends View
  {
      private $category = null;
      
      function __construct()
      {
          $this->model = new Poster;
      }
      
      protected function get()
      {   
          //Authenticate
          $auth = new AuthView;
          $auth->authenticate();
          
          $this->download_poster_imgs();
          $result = $this->model->read();
          $this->server_reply($result);
      }
      
      protected function post()
      {
          $this->validate_post_data();
          $file_ary = [];
          
          if(!empty($_FILES['images'])) {
            $file_ary = $this->re_arrange($_FILES['images']);
            $this->validate_images($file_ary);
          }

          $create = $this->model->create([
            'content' => $_POST,
            'images' => $file_ary
          ]);

          $message = 'Request successful!';
          $code = 201;
          if (!$create || !isset($create['id'])) {
            $message = 'There was an error while making the request!';
            $code = 400;
          }

          $this->server_reply([
            'message' => $message,
          ], $code);
      }
      
      private function validate_post_data()
      {
          $error = false;
          $error_found = [];
          
          if (empty($_POST["category"])) {
            $error = true;
            array_push($error_found, [
              'category' => 'poster category is required!'
            ]);
          }
          
          if (empty($_POST["email"])) {
            $error = true;
            array_push($error_found, [
              'email' => 'customer email is required!'
            ]);
          }
          
          if($error){
            $this->server_reply([
              'message' => 'There were errors found!',
              'errors' => $error_found
            ], 400);
          }
      }
      
      private function re_arrange($file_post){
          foreach( $file_post as $key => $all_files ){
            foreach( $all_files as $index => $value ){
              $new[$index][$key] = $value;   
            }   
          }
          return $new;
      }
      
      private function validate_images($images)
      {
          $image_ext = array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif'
          );
          
          foreach ($images as $index => $file) {
            $is_image = false;
            foreach ($image_ext as $key => $value) {
              if ($file['type'] == $value) {
                $is_image = true;
              }
            }

            if (!$is_image) {
              $this->server_reply([
                'message' => 'There were errors found!',
                'errors' => [
                  'images' => 'file "' .$file['name'] .'" is not an image!'
                ]
              ], 400);
            }
          }
      }
      
      private function download_poster_imgs()
      {
          if(!empty($_GET["filter"]) && !empty($_GET["id"])){
            $poster_id = $_GET["id"];
            
            $this->server_reply([
              'message' => 'Downloading!',
            ]);
          }
      }
  }
  
