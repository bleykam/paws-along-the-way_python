# serializers.py
from rest_framework import serializers
from django.contrib.auth import REDIRECT_FIELD_NAME, get_user_model
from .models import User, Animal, Organization, Hours, Address, SocialMedia, TransportRequest, Attributes, Environment


# Serializers define the API representation.

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'
        

class AttributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attributes
        fields = '__all__'


class EnvironmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Environment
        fields = '__all__'


class AnimalSerializer(serializers.ModelSerializer):
    attributes = AttributesSerializer()
    environment = EnvironmentSerializer()

    class Meta:
        model = Animal
        fields = '__all__'
    gender = serializers.ChoiceField(choices=Animal.GENDER_CHOICES)
    size = serializers.ChoiceField(choices=Animal.SIZE_CHOICES)      


class HoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hours
        fields = '__all__'


class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = '__all__'


class TransportRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportRequest
        fields = '__all__'

    origin_address = AddressSerializer()
    destination_address = AddressSerializer()
    time = serializers.ChoiceField(choices=TransportRequest.TIME_CHOICES)


class OrganizationSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=False)

    class Meta:
        model = Organization
        fields = '__all__'

        social_media = SocialMediaSerializer(required=False)



class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'first_name', 'last_name')
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
