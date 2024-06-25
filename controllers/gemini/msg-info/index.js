const msg_object = {
  dataset_empty: `The dataset is currently empty, please attach a dataset so that the AI can work according to the prompt or auto response context. Use the "update-dataset <your dataset>" command to update the dataset.`,

  success_clear_chat: `Success clear chat!, you can start new topic.`,

  invalid_key_to_change_persona: `Persona key can only to set to "origin" or "mod".\nExample cmd: "change-persona origin" or "change-persona mod".`,
  invalid_persona_args: `Invalid input!. Persona input must be at least more than 20 characters long.`,
  invalid_dataset_args: `Invalid input!. Dataset input must be at least more than 50 characters long.`,

  error_occured: `Oops, something went wrong! Please try again later, or contact Admin if the issue persists. Type *admin* to access Admin contacts.`,
};

function formatMessage(response) {
  return `${response}\n\n> Type *clear* to start new topic.`;
}

const textMsgTemplate = {
  /**
   * @param { string } arg
   */
  get_persona: (arg) =>
    `The current persona is set to *${arg}*. Heres the persona...`,
  /**
   * @param { string } arg
   */
  change_persona: (arg) =>
    `Success switch persona/system instructions to: *${arg}* persona.`,
  /**
   * @param { string } arg
   */
  set_persona: (arg) =>
    `Success change persona/system instructions to:\n\n${arg}`,
};

/**
 *
 * @param { keyof typeof textMsgTemplate } key
 * @param  { string[] } args
 */
function textFormat(key, ...args) {
  return textMsgTemplate[key](args);
}

/**
 *
 * @param { keyof typeof msg_object } key
 * @returns
 */
const quickMessage = (key) => msg_object[key];

module.exports = { quickMessage, formatMessage, textFormat };
