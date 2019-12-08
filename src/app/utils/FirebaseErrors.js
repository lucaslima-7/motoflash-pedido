export const formatAuthError = error => {
  switch (error.code) {
    case "auth/wrong-password":
      return "A senha não confere"
    case "auth/user-not-found":
      return "Usuário não existe"
    case "auth/email-already-in-use":
      return "O email já está em uso"
    default:
      return "Erro desconhecido, contate o suporte"
  }
}