# animal-finder API

# Recursos

> A API responde no formato JSON.


## Dono

### Listagem de dono [GET /owner].

- Request

  --
- Response (code 200) array com todos os dados de todos os donos
  - Body

    ```JSON
      [
        {
          "id": 1,
          "name": "Jhon",
          "email": "jhon@teste2.com",
          "phone": "9999999999",
          "password": "teste"
        },
        {
          "id": 2,
          "name": "Mary",
          "email": "mary@teste.com",
          "phone": "9999999999",
          "password": "teste"
        }
      ]

### Cadastro de Dono [POST /owner]

- Atributos (object)

  - name: nome do dono (string, required)
  - email: email do dono (string, required, email)
  - phone: telefone do dono (string, required, length(10))
  - password: senha do dono (string, required)

- Request

  - Body

    ```JSON
    {
      "name": "Jhon",
      "email": "jhon@teste2.com",
      "phone": "9999999999",
      "password": "teste"
    }

- Response (code 200)
  - Body

    ```JSON
      {
        "message": "Dono registrado!",
        "id": 1,
        "name": "Jhon"
      }


## Animail.

### Listagem de Animal [GET /animal?page=number]

Retorna todos os dados dos animais e de seus donos.

A listagem está limitada a quatro animais por página.

- Request

  - Query

    page: (number, required), página da listagem

- Response (code 200)
  - Body

    ```JSON
      [
        {
          "id": 1,
          "picture": "4z70mkMx5NC1WVw8hLuP4j",
          "name": "Bobi",
          "age": 2,
          "info": "Perdido em tal lugar",
          "city": "Cidade Teste 1",
          "uf": "sp",
          "status": 0,
          "ownerId": 1,
          "ownerName": "Jhon",
          "email": "jhon@teste2.com",
          "phone": "9999999999"
        },
        {
          "id": 2,
          "picture": "mkMx5NC14z70WVw8hjsanI4",
          "name": "Mimi",
          "age": 2,
          "info": "Perdido em tal lugar 2",
          "city": "Cidade Teste 2",
          "uf": "sp",
          "status": 0,
          "ownerId": 2,
          "ownerName": "Mary",
          "email": "mary@teste.com",
          "phone": "9999999999"
        }
      ]

  - Headers

    X-Total-Pages: number (número total de páginas)

### Cadastro de Animal [POST /animal]

- Atributos (object)

  - picture: valor da foto do animal em encode base64 (string, required)
  - name: nome do animal (string, required)
  - age: idade do animal (number, integer, required)
  - info: informações do desaparecimento (string, required)
  - city: cidade do desaparecimento (string, required)
  - uf: estado do desaparecimento (string, required, length(2))
  - status: estado do animal (0 - Desaparecido, 1 - Comunicado, 2 - Encontrado) (string, required, min(0), max(2))

- Request

  - Headers

    - Authorization: Bearer [owner_id]

  - Body

    ```JSON
    {
      "picture": "4z70mkMx5NC1WVw8hLuP4j",
      "name": "Bobi",
      "age": 2,
      "info": "Perdido em tal lugar",
      "city": "Cidade Teste 1",
      "uf": "sp",
      "status": 0
    }

- Response (code 200)
  - Body

    ```JSON
      {
        "message": "Animal cadastrado!",
        "id": 1
      }

### Update de Animal [POST /animal/:id]

- Atributos (object)

  - picture: valor da foto do animal em encode base64 (string, required)
  - name: nome do animal (string, required)
  - age: idade do animal (number, integer, required)
  - info: informações do desaparecimento (string, required)
  - city: cidade do desaparecimento (string, required)
  - uf: estado do desaparecimento (string, required, length(2))
  - status: estado do animal (0 - Desaparecido, 1 - Comunicado, 2 - Encontrado) (string, required, min(0), max(2))

- Request

  - Headers

    - Authorization: Bearer [owner_id]

  - Params

    - id: id do animal

  - Body

    ```JSON
    {
      "picture": "4z70mkMx5NC1WVw8hLuP4j",
      "name": "Bobi",
      "age": 2,
      "info": "Perdido em tal lugar",
      "city": "Cidade Teste 1",
      "uf": "sp",
      "status": 0
    }

- Response (code 200)
  - Body

    ```JSON
      {
        "message": "Informações atualizadas!"
      }

- Response (code 401)
  - Body

    ```JSON
    {
      "message": "Você não tem permissão para editar os dados deste animal."
    }

### Exclusão de Animal [DELETE /animal/:id]

- Request

  - Headers

    - Authorization: Bearer [owner_id]

  - Params

    - id: id do animal

- Response (code 204)

- Response (code 401)
  - Body

    ```JSON
    {
      "message": "Você não tem permissão para excluir esse animal."
    }


## Comunicado

### Cadastro de Comunicado [POST /communique]

- Atributos (object)

  - name: nome de quem encontrou (string, required)
  - phone: nome de quem encontrou (string, required, length(10))
  - info: informações (string, required)
  - animalId: id do animal

- Request

  - Body

    ```JSON
    {
      "name": "Jhon",
      "phone": "1566666666",
      "info": "Achei aqui",
      "animalId": 1
    }

- Response (code 200)
  - Body

    ```JSON
    {
      "message": "Comunicado registrado!",
      "id": 10
    }

- Response (code 401)
  - Body

    ```JSON
    {
      "message": "Erro ao enviar mensagem!"
    }

## Animais do Dono.

### Listagem de animais cadastrados pelo dono [GET /owner-animals]

Retorna todos os dados dos animais cadastrados pelo dono e a lista de comunicados.

- Request

  - Headers

    - Authorization: Bearer [owner_id]

- Response (code 200)
  - Body

    ```JSON
      [
        {
          "id": 1,
          "picture": "4z70mkMx5NC1WVw8hLuP4j",
          "name": "Bobi",
          "age": 2,
          "info": "Perdido em tal lugar",
          "city": "Cidade Teste 1",
          "uf": "sp",
          "status": 0,
          "ownerId": 1,
          "communiques": [
            {
              "id": 1,
              "name": "Jhon",
              "phone": "1566666666",
              "info": "Achei aqui",
              "animalId": 1
            },
            {
              "id": 2,
              "name": "Moises",
              "phone": "3434343111",
              "info": "achei",
              "animalId": 1
            },
          ]
        },
        {
          "id": 2,
          "picture": "mkMx5NC14z70WVw8hjsanI4",
          "name": "Mimi",
          "age": 2,
          "info": "Perdido em tal lugar 2",
          "city": "Cidade Teste 2",
          "uf": "sp",
          "status": 0,
          "ownerId": 2,
          "communiques": [
            {
              "id": 3,
              "name": "Jhon",
              "phone": "1566666666",
              "info": "Achei aqui",
              "animalId": 2
            },
            {
              "id": 4,
              "name": "Moises",
              "phone": "3434343111",
              "info": "achei",
              "animalId": 2
            },
          ]
        }
      ]

## Login

### Realizar Login [POST /login]

- Atributos (object)

  - email: email do dono (string, required)
  - senha: senha do dono (string, required)

- Request

  - Body

    ```JSON
    {
      "email": "jhon@teste.com",
      "password": "teste"
    }

- Response (code 200)
  - Body

    ```JSON
    {
      "id": 1,
      "name": "Jhon"
    }

- Response (code 400)
  - Body

    ```JSON
    {
      "message": "E-Mail ou senha inválidos!"
    }
