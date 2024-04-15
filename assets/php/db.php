<?php
class Database {
	private $servername = "localhost";
	private $username = "root";
	private $password = "";
	private $mydb = "bookstore";
	public $con;

	private $dsn = "mysql:dbname=bookstore;host=localhost";
	public $pdo;

	function __construct() {
		$this->con = new mysqli(
			$this->servername,
			$this->username,
			$this->password,
			$this->mydb
		);
		mysqli_set_charset($this->con, 'utf8');

		if(!$this->con) {
			echo 'Cannot connect to database server';
			exit;
		}	
		
		$this->pdo = new PDO(
			$this->dsn,
			$this->username,
			$this->password
		);
		if(!$this->pdo) {
			echo 'Cannot connect to pdo';
			exit;
		}	
	}
}
?>