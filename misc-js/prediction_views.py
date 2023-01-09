from django.shortcuts import render
from django.views.generic import View
from rest_framework import status

from ....notifications import NotificationManager
from ... import connect_ws_run_inference
from ... import JudgementPredictionForm
from ....mixins import LawyersAndAdminAuthMixin


class JudgementPredictionFormView(LawyersAndAdminAuthMixin, View):
    """
    Class-Based View that shows the form

    """

    def get(self, request):
        """Get form and render template"""

        form = JudgementPredictionForm()

        nmanager = NotificationManager()
        notifications, unread = nmanager.get_notification(request.user.id)

        # define what goes in the page
        page_rendering = {
            "form": form,
            "notifications": notifications,
            "unread": unread,
            "errors": []
        }

        return render(
            request,
            "pages/judgement_prediction/predict_form.html",
            page_rendering,
        )


class JudgementPredictionResultView(LawyersAndAdminAuthMixin, View):
    """
    Class-Based View that shows the results of the 
    judgement prediction algorithm

    Args:
        LawyersAndAdminAuthMixin
        View
    """
    def post(self, request):
        """Handle form submit and run inference"""

        data_request = request.POST.dict()
        request_host = request.get_host()

        # connect to ws judgement prediction to run inference & get results
        response_json = connect_ws_run_inference(data_request, request_host)
        if response_json['http_status_code'] == status.HTTP_200_OK:
            # prepare data to pass to the rendering
            form_fields = [i for i in data_request.keys() if "token" not in i]
            features_importance = response_json["result"]["model_info"]["fields"]["features_importance"]
            features_model = [i['feature'] for i in features_importance]
            missing_features = [i for i in form_fields if i not in features_model]
            for i in missing_features:
                features_importance.append({"feature":i,"importance":0.0})
            for idx,val in enumerate(features_importance):
                features_importance[idx]["feature"] = " ".join(val["feature"].split("_")).upper()

            predicted_class = " ".join(response_json["result"]["predicted_class"].split("_")).upper()
            predicted_class_proba = round((response_json["result"]["predicted_class_proba"])*100)
            predicted_class_proba_str = str(predicted_class_proba)+"%"

            # what goes in the page
            page_rendering = {
                "predicted_class": predicted_class,
                "predicted_class_proba_str": predicted_class_proba_str,
                "predicted_class_proba": predicted_class_proba,
                "features_importance": features_importance,
                "msg":response_json["result"]["msg"]
            }

            return render(
                request,
                "pages/judgement_prediction/prediction_results.html",
                page_rendering,
            )

        else:  # if response_json['http_status_code'] == status.HTTP_400_BAD_REQUEST:
            notification_manager = NotificationManager()
            notifications, unread = notification_manager\
                .get_notification(request.user.id)
            form = JudgementPredictionForm()
            page_rendering = {
                "form": form,
                "notifications": notifications,
                "unread": unread,
                "errors": response_json['errors']
            }

            return render(
                request,
                "pages/judgement_prediction/predict_form.html",
                page_rendering,
            )
