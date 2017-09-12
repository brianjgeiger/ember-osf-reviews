import Ember from 'ember';

export default Ember.Component.extend({
    i18n: Ember.inject.service(),

    breadcrumbs: Ember.computed('navigator.currentPath', function(){
        // Always include the dashboard breadcrumb
        const breadcrumbs = [{
            name: this.get('i18n').t('dashboard.title'),
            path: 'index',
        }];
        for (const r of this.get('navigator.routeContexts')) {
            // Skip crumbs with no context
            if (Ember.isEmpty(r.context) || !Object.keys(r.context).length) continue;

            // Skip crumbs with the same context as the prior crumb
            if (r.context === breadcrumbs[breadcrumbs.length - 1].context) continue;

            // Prefer model name or title, fall back to the route name
            r.name = (r.context.get && (r.context.get('name') || r.context.get('title'))) || r.part;
            breadcrumbs.push(r);
        }
        return breadcrumbs;
    }),
});
