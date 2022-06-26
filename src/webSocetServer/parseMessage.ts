export const parseMessage = (wsMessage:any) => {
  const [command, params1, params2] = wsMessage.toString().split(' ');
  return {
    command,
    firstPar: +params1,
    secondPar: +params2
  }
}