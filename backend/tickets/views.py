from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hello_world(request):
    return Response({"message": "Hello, world!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def public_endpoint(request):
    return Response({"message": "This is a public endpoint"}, status=status.HTTP_200_OK)
