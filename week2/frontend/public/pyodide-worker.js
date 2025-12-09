// pyodide-worker.js — loads Pyodide in a dedicated worker and runs Python code securely in the browser

self.addEventListener('message', async (evt) => {
  const data = evt.data || {};

  try {
    if (data.type === 'init') {
      // Load Pyodide from CDN
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
      self.pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });
      postMessage({ type: 'py_ready' });
      return;
    }

    if (data.type === 'run') {
      const code = String(data.code || '');
      let output = '';
      let error = null;

      try {
        const pyodide = self.pyodide;
        if (!pyodide) throw new Error('Pyodide not initialized');

        // Redirect sys.stdout to capture print output
        const wrappedCode = `
import sys, io
buffer = io.StringIO()
sys.stdout = buffer
try:
    exec(${JSON.stringify(code)})
finally:
    sys.stdout = sys.__stdout__
buffer.getvalue()
        `;

        output = await pyodide.runPythonAsync(wrappedCode);
      } catch (e) {
        error = String(e);
      }

      postMessage({
        type: 'py_result',
        output: (output || '').trim(),
        error
      });
      return;
    }
  } catch (e) {
    postMessage({
      type: 'py_result',
      output: '',
      error: String(e)
    });
  }
});
