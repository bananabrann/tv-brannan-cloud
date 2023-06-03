<script>
  export let data;
</script>

<h2>Ask a question</h2>

<form action="?/send" method="POST">
  <label for="question"
    >Question
    <input type="text" autocomplete="off" id="question" name="question-content" />
  </label>
  <button type="submit">Send message</button>
</form>
<small>Chatting with agent <b /></small>
