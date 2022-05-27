CREATE DATABASE la_vie;

use la_vie;

CREATE TABLE psicologos(
   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(100),
   email VARCHAR(100) UNIQUE,
   senha VARCHAR(500),
   apresentacao VARCHAR(1000),
   status TINYINT(1) DEFAULT 1
);
CREATE TABLE pacientes(
   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(100),
   email VARCHAR(100) UNIQUE,
   idade DATE,
   status TINYINT(1) DEFAULT 1
);
CREATE TABLE atendimentos(
   id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
   data_atendimento DATETIME,
   observacao VARCHAR(1000),
   psicologo_id INTEGER NOT NULL,
   paciente_id INTEGER NOT NULL,

   CONSTRAINT psicologos_pacientes FOREIGN KEY
      (psicologo_id) REFERENCES psicologos(id),

   CONSTRAINT pacientes_psicologos FOREIGN KEY
      (paciente_id) REFERENCES pacientes(id)
);