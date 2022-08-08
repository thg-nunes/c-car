## Modules - são "pequenos pedaços da aplicação"
  -- aqui separo a aplicação em modulos/diretórios que pertencem a um mesmo contexto para facilitar a manutenção e organização do código

## Model
  -- ficam as classes com atributos que serão usadas nos repositories

## Repositories
  -- é a camada responsável por manipular os dados da aplicação junto ao banco de dados;
  -- aqui ficam todos os metodos e regras correspondentes as tabelas do banco

## Services
  -- aqui são feitas as implementações dos repositories

## UseCases
  -- são as regras de negócio da aplicação, ou seja, as funcionalidades da aplicação
  -- nos arquivos ...UseCase faço as chamadas pros repositories
  -- nos arquivos ...Controller faço a chamada pros arquivos ...UseCase
  # controllers -> chamam e dependem de -> usecases -> chamam e dependem de -> repositories
  # index.ts -> fazer instancia e injetar as dependencias dos controllers e dos usecases

## Controllers
  -- são classes que recebem a requisição, executam a regra para aquela rota e retornam a resposta

