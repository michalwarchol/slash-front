export default (
  errors: Record<string, string>,
  apiMessages: { default: string; [key: string]: string }
) => {
  const firstError = Object.keys(errors)[0];

  const message = apiMessages[errors[firstError]];

  if (message) {
    return message;
  }

  return apiMessages.default;
};
