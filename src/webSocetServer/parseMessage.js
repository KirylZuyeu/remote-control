export const parseMessage = (wsMessage) => {
  const [command, params1, params2] = wsMessage.toString().split(' ');
  return {
    command,
    firstPar: +params1,
    secondPar: +params2
  }
}