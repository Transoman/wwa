<?php
  $SITE_TITLE = 'WWA';

  if ( isset($_POST) ) {
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $services = isset($_POST['services']) ? $_POST['services'] : '';
    $time = isset($_POST['time']) ? htmlspecialchars(trim($_POST['time'])) : '';
    $msg = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';

    $to = 'Elena357910@yandex.com';
    $no_reply = 'no-reply@silk-its.com';

    $boundary = md5(date('r', time()));
    $filesize = '';
    $headers = "From: $SITE_TITLE \r\n";
    $headers .= "MIME-Version: 1.0 \r\n";
    $headers .= "Reply-To: $email ? $email : $no_reply \r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $data = '<h1>'.$subject."</h1>";
    if ($name) {
      $data .= 'Имя: '.$name."<br>";
    }
    if ($email) {
      $data .= 'Email: '.$email."<br>";
    }
    if ($phone) {
      $data .= 'Телефон: '.$phone."<br>";
    }
    if ($services) {
      foreach ($services as $item) {
        $data .= 'Услуга: '.$item."<br>";
      }
    }
    if ($time) {
      $data .= 'Время начата работы: '.$time."<br>";
    }
    if ($msg) {
      $data .= 'Сообщение: <p>'.$msg."</p><br>";
    }

    $message ="Content-Type: multipart/mixed; boundary=\"$boundary\"
      --$boundary
      Content-Type: text/html; charset=\"utf-8\"\n\n
      $data\n\n";

    if (is_uploaded_file($_FILES['file']['tmp_name'])) {
      $attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'])));
      $filename = $_FILES['file']['name'];
      $filetype = $_FILES['file']['type'];
      $filesize = $_FILES['file']['size'];

      $message .="
  
      --$boundary
      Content-Type: \"$filetype\"; name=\"$filename\"
      Content-Transfer-Encoding: base64
      Content-Disposition: attachment; filename=\"$filename\"
  
      $attachment";
    }
    $message.="
    --$boundary--";

//    $message .= "<div style='background:#ccc;border-radius:10px;padding:20px;'>
//        ".$data."
//        <br>\n
//        <hr>\n
//        <br>\n
//        <small>это сообщение было отправлено с сайта ".$SITE_TITLE.", отвечать на него не надо</small>\n</div>";
    $send = mail($to, $subject, $message, $headers);

    if ( $send ) {
      echo '';
    } else {
        echo '<div class="error">Ошибка отправки формы</div>';
    }

  }
  else {
      echo '<div class="error">Ошибка, данные формы не переданы.</div>';
  }
  die();
?>