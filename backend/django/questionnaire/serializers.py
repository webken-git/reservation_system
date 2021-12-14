from rest_framework import serializers
from questionnaire.models import Choice, Question, Questionnaire, Answer, AnswerStatus
from users.models import User
from users.serializers import UserSerializer


class ChoiceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Choice
    fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
  choice = ChoiceSerializer(many=True, read_only=True)
  choice_id = serializers.PrimaryKeyRelatedField(queryset=Choice.objects.all(), many=True, write_only=True)

  class Meta:
    model = Question
    fields = '__all__'

  def create(self, validated_data):
    validated_data['choice'] = validated_data.get('choice_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['choice_id']

    choice_data = validated_data.pop('choice')
    choice = Question.objects.create(**validated_data)
    choice.save()
    choice.choice.set(choice_data)

    return choice

  def update(self, instance, validated_data):
    # 更新処理
    instance.question = validated_data.get('question', instance.question)
    validated_data['choice'] = validated_data.get('choice_id', instance.choice)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['choice_id']

    choice_data = validated_data.pop('choice')
    instance.save()
    instance.choice.set(choice_data)

    return instance


class QuestionnaireSerializer(serializers.ModelSerializer):
  question = QuestionSerializer(many=True, read_only=True)
  question_id = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), many=True, write_only=True)

  class Meta:
    model = Questionnaire
    fields = '__all__'

  def create(self, validated_data):
    validated_data['question'] = validated_data.get('question_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['question_id']

    question_data = validated_data.pop('question')
    questionnaire = Questionnaire.objects.create(**validated_data)
    questionnaire.save()
    questionnaire.question.set(question_data)

    return questionnaire

  def update(self, instance, validated_data):
    # 更新処理
    instance.title = validated_data.get('title', instance.title)
    instance.overview = validated_data.get('overview', instance.overview)
    instance.deadline = validated_data.get('deadline', instance.deadline)
    validated_data['question'] = validated_data.get('question_id', instance.question)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['question_id']

    question_data = validated_data.pop('question')
    instance.save()
    instance.question.set(question_data)

    return instance


class AnswerSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
  question = QuestionSerializer(read_only=True)
  question_id = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), write_only=True)

  class Meta:
    model = Answer
    fields = '__all__'

  def create(self, validated_data):
    validated_data['user'] = validated_data.get('user_id', None)
    validated_data['question'] = validated_data.get('question_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']
    del validated_data['question_id']

    return Answer.objects.create(**validated_data)

  def update(self, instance, validated_data):
    # 更新処理
    instance.user = validated_data.get('user_id', instance.user)
    instance.question = validated_data.get('question_id', instance.question)
    instance.answer = validated_data.get('answer', instance.answer)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']
    del validated_data['question_id']
    instance.save()

    return instance


class AnswerStatusSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
  questionnaire = QuestionnaireSerializer(read_only=True)
  questionnaire_id = serializers.PrimaryKeyRelatedField(queryset=Questionnaire.objects.all(), write_only=True)
  answer = AnswerSerializer(many=True, read_only=True)
  answer_id = serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all(), many=True, write_only=True)

  class Meta:
    model = AnswerStatus
    fields = '__all__'

  def create(self, validated_data):
    validated_data['user'] = validated_data.get('user_id', None)
    validated_data['questionnaire'] = validated_data.get('questionnaire_id', None)
    validated_data['answer'] = validated_data.get('answer_id', None)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']
    del validated_data['questionnaire_id']
    del validated_data['answer_id']

    answer_data = validated_data.pop('answer')
    answerstatus = AnswerStatus.objects.create(**validated_data)
    answerstatus.save()
    answerstatus.answer.set(answer_data)

    return answerstatus

  def update(self, instance, validated_data):
    # 更新処理
    instance.user = validated_data.get('user_id', instance.user)
    instance.questionnaire = validated_data.get('questionnaire_id', instance.questionnaire)
    validated_data['answer'] = validated_data.get('answer_id', instance.answer)

    # PrimaryKeyRelatedFieldを削除
    del validated_data['user_id']
    del validated_data['questionnaire_id']
    del validated_data['answer_id']

    answer_data = validated_data.pop('answer')
    instance.save()
    instance.answer.set(answer_data)

    return instance
