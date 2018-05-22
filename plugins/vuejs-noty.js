export default ({ app }) => 
{
  
  const Noty = require('noty');

  Noty.overrideDefaults({
    layout   : 'bottomRight',
    theme    : 'bootstrap-v4',
    progressBar: true,
    timeout: 1000,
  });
  app.Noty = Noty  
}
