// reasoning-effort-injector — standing-composition plugin for the
// gokou-ruri preset's flash-butler route.
//
// Why it exists: the main session carries its own reasoning effort
// (agent-default-model: deepseek-v4-flash-0731 @ xhigh, injected by
// installModelSelection at the Web/headless entry), but spawn children
// (the `flash` worker and the `escalate` pro worker) never install
// installModelSelection, so their requests carry NO reasoningEffort and
// the model/OpenRouter default applies.
//
// This plugin listens on the `agent/request` waterfall — scope-filtered by
// agent, and this row mounts on the standing composition that both the main
// session and every child join, so the listener hears all of them — and
// gives the escalation model an explicit xhigh effort. The main session
// (flash-0731) and the flash worker (flash-0731) do not match the model
// filter and are left untouched, so the cheap worker keeps the model default
// while the pro worker reasons at full power. Pure configuration of the
// request config; no core-package edits.
//
// The row lives in agent.cordis.yml as:
//   - id: reasoning-effort-injector
//     name: './reasoning-effort-injector.js'
module.exports = {
  name: 'reasoning-effort-injector',
  apply(ctx) {
    ctx.on('agent/request', async (_payload, next) => {
      const config = await next()
      // Only the escalation model gets an explicit effort. A request that
      // already carries one (e.g. a persisted header) is left as-is.
      if (config.model === 'deepseek/deepseek-v4-pro-0813' && config.reasoningEffort === undefined) {
        return { ...config, reasoningEffort: 'xhigh' }
      }
      return config
    })
  },
}
