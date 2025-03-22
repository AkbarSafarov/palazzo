<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"] ?? "");
    $phone = htmlspecialchars($_POST["phone"] ?? "");
    $message = htmlspecialchars($_POST["message"] ?? "");
    $policy = isset($_POST["policy"]); // Проверка галочки

    if (!$policy) {
        die("Вы должны согласиться с политикой конфиденциальности.");
    }

    // Проверка наличия обязательных полей
    if (empty($phone)) {
        die("Введите номер телефона.");
    }

    // Обработка файла
    $filePath = "";
    if (!empty($_FILES["file"]["name"])) {
        $uploadDir = "uploads/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = basename($_FILES["file"]["name"]);
        $filePath = $uploadDir . time() . "_" . $fileName;

        if (!move_uploaded_file($_FILES["file"]["tmp_name"], $filePath)) {
            die("Ошибка загрузки файла.");
        }
    }

    // Отправка email
    $to = "your@email.com"; // Замените на свой email
    $subject = "Новое сообщение с формы";
    $body = "Имя: $name\nТелефон: $phone\nСообщение: $message";

    $headers = "From: site@yourdomain.com\r\n";
    $headers .= "Reply-To: $phone\r\n";

    // Если прикреплен файл, добавляем его в письмо
    if ($filePath) {
        $fileContent = chunk_split(base64_encode(file_get_contents($filePath)));
        $fileType = mime_content_type($filePath);
        $boundary = md5(time());

        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
        $body .= "Имя: $name\nТелефон: $phone\nСообщение: $message\r\n";
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $body .= $fileContent . "\r\n";
        $body .= "--$boundary--";
    }

    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Ошибка при отправке.";
    }
} else {
    echo "Некорректный запрос.";
}
?>
