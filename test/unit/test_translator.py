from mock import patch
import openai

client = openai.OpenAI(
    api_key="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"  # Replace with your OpenAI API key
)

def get_language(post: str) -> str:
    context = "" # TODO: Insert context
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"Identify the language of this text: {post}"
            }
        ]
    )
    return response.choices[0].message.content

def get_translation(post: str) -> str:
    context = "" # TODO: Insert context
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"Translate this text to English: {post}"
            }
        ]
    )
    return response.choices[0].message.content

def query_llm_robust(post: str) -> tuple[bool, str]:
  '''
  TODO: Implement this
  '''
  try:
    language = get_language(post)

    if not isinstance(language, str):
      raise ValueError("Unexpected language format.")

    if language.lower() == "english":
      return (True, post)

    translation = get_translation(post)

    if not isinstance(translation, str):
      raise ValueError("Unexpected translation format.")

    return (False, translation)

  except Exception as e:
      print(f"Error encountered: {e}")
      return (False, "[Error handling applied]")

@patch.object(client.chat.completions, 'create')
def test_unexpected_language(mocker):
  # we mock the model's response to return a random message
  mocker.return_value.choices[0].message.content = "I don't understand your request"

  # TODO assert the expected behavior
  assert query_llm_robust("Hier ist dein erstes Beispiel.")

@patch.object(client.chat.completions, 'create')
def test_empty_response(mocker):
    mocker.return_value.choices[0].message.content = ""
    result = query_llm_robust("Hola, ¿cómo estás?")
    assert result == (False, "[Error handling applied]"), f"Expected (False, '[Error handling applied]'), got {result}"

@patch.object(client.chat.completions, 'create')
def test_non_string_response(mocker):
    mocker.return_value.choices[0].message.content = None
    result = query_llm_robust("Bonjour tout le monde.")
    assert result == (False, "[Error handling applied]"), f"Expected (False, '[Error handling applied]'), got {result}"

@patch.object(client.chat.completions, 'create')
def test_unexpected_language_output(mocker):
    mocker.return_value.choices[0].message.content = "UnknownLanguage"
    result = query_llm_robust("Hier ist dein erstes Beispiel.")
    assert result == (False, "[Error handling applied]"), f"Expected (False, '[Error handling applied]'), got {result}"