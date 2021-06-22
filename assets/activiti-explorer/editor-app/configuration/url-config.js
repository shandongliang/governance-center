/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */
var KISBPM = KISBPM || {};
var contextRoot = ACTIVITI.CUSTOMCONFIG.contextRoot ? ACTIVITI.CUSTOMCONFIG.contextRoot : ACTIVITI.CONFIG.contextRoot;
KISBPM.URL = {

    getModel: function (modelId) {
        return contextRoot + '/getModelInfoForEditor?modelId=' + modelId;
    },

    getStencilSet: function () {
        return contextRoot + '/getStencilSet?version=' + Date.now();
    },

    putModel: function (modelId) {
        return contextRoot + '/saveModel';
    }
};