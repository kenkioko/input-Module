<?php namespace Api\Includes\View;

  require_once __DIR__ .'/../reply.php';
  
  use Api\Includes\ServerReply;
  
  class View
  {
      use ServerReply;
      
      protected $model = null;
      
      public function show_view()
      {
          /*
           * process requests
           */
          switch ($_SERVER["REQUEST_METHOD"]) {
            case "POST":
              $this->post();
              break;
            case "GET":
              $this->get();
              break;
            case "PUT":
              $this->put();
              break;
            case "DELETE":
              $this->delete();
              break;
            default:
              $this->method_not_allowed();
              break;
          }
      }
      
      protected function post()
      {
          $this->method_not_allowed();
      }
      
      protected function get()
      {
          $this->method_not_allowed();
      }
      
      protected function put()
      {
          $this->method_not_allowed();
      }
      
      protected function delete()
      {
          $this->method_not_allowed();
      }
      
      private function method_not_allowed()
      {
        $this->server_reply([
          'message' => 'Method Not Allowed',
        ], 405);
      }
  }
  
