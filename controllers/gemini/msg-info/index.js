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

/**
 *
 * @param { keyof typeof msg_object } key
 * @returns
 */
const quickMessage = (key) => msg_object[key];

module.exports = { quickMessage, formatMessage };
